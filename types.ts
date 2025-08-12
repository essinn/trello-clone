import { Card, List } from "@/lib/generated/prisma";

export type ListWithCards = List & { cards: Card[] };
export type CardWithList = List & { list: List[] };
