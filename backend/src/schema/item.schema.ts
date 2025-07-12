import { z } from "zod";

const CategoryEnum = z.enum([
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Books",
  "Sports",
  "Vehicles",
  "Collectibles",
  "Other",
]);

const SizeEnum = z.enum([
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "One Size",
  "Small",
  "Medium",
  "Large",
]);

const ConditionEnum = z.enum([
  "New",
  "Used - Like New",
  "Used - Good",
  "Used - Fair",
  "For Parts/Not Working",
]);

const ItemTypeEnum = z.enum(["Sell", "Donate", "Exchange"]);

export const createItemSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(1000, { message: "Description cannot exceed 1000 characters." }),
  category: CategoryEnum,
  size: SizeEnum,
  condition: ConditionEnum,
  type: ItemTypeEnum,
  price: z.number().min(0, { message: "Price must be a positive number." }),
  tags: z.array(z.string()).optional(),
});

export const updateItemSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(1000, { message: "Description cannot exceed 1000 characters." }),
  category: CategoryEnum,
  size: SizeEnum,
  condition: ConditionEnum,
});
