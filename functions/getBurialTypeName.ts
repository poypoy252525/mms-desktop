import { BurialType } from "@prisma/client";

export const getBurialTypeName = (burialType: BurialType): string => {
  let name = "";
  switch (burialType) {
    case "APARTMENT":
      name = "Apartment";
      break;
    case "COLUMBARIUM":
      name = "Columbarium";
      break;
    case "FAMILY_LOT":
      name = "Family";
      break;
    case "LAWN_LOT":
      name = "Lawn";
      break;
  }
  return name;
};
