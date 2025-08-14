import { auth, currentUser } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "./generated/prisma";
import { prisma } from "./prisma";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = await auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found");
    }

    const { entityId, entityType, entityTitle, action } = props;

    await prisma.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (error) {
    console.log("audit log error: ", error);
  }
};
