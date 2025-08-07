import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/organization/:organizationId"
      afterCreateOrganizationUrl="/organization/:organizationId"
    />
  );
}
