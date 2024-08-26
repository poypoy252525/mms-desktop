const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.death.createMany({
    data: [
      {
        firstName: "Alice",
        lastName: "Johnson",
        age: 75,
        dateOfBirth: new Date("1949-05-10"),
        dateOfDeath: new Date("2024-05-15"),
        causeOfDeath: "Heart Disease",
        nextOfKinName: "Robert Johnson",
        nextOfKinRelationship: "Husband",
        nextOfKinContact: "123-456-7890",
        status: "ACTIVE",
        burialId: "66cc6909be12598bcc14bfad",
      },
      {
        firstName: "Bob",
        lastName: "Smith",
        age: 82,
        dateOfBirth: new Date("1942-03-22"),
        dateOfDeath: new Date("2024-06-05"),
        causeOfDeath: "Cancer",
        nextOfKinName: "Linda Smith",
        nextOfKinRelationship: "Wife",
        nextOfKinContact: "234-567-8901",
        status: "INACTIVE",
        burialId: "66cc6909be12598bcc14bfad",
      },
      {
        firstName: "Charles",
        lastName: "Williams",
        age: 70,
        dateOfBirth: new Date("1954-09-15"),
        dateOfDeath: new Date("2024-09-20"),
        causeOfDeath: "Stroke",
        nextOfKinName: "Emily Williams",
        nextOfKinRelationship: "Daughter",
        nextOfKinContact: "345-678-9012",
        status: "INACTIVE",
        burialId: "66cc6909be12598bcc14bfad",
      },
      {
        firstName: "Diana",
        lastName: "Brown",
        age: 68,
        dateOfBirth: new Date("1956-11-30"),
        dateOfDeath: new Date("2024-12-05"),
        causeOfDeath: "Accident",
        nextOfKinName: "David Brown",
        nextOfKinRelationship: "Husband",
        nextOfKinContact: "456-789-0123",
        status: "INACTIVE",
        burialId: "66cc6909be12598bcc14bfad",
      },
      {
        firstName: "Edward",
        lastName: "Jones",
        age: 64,
        dateOfBirth: new Date("1960-02-14"),
        dateOfDeath: new Date("2024-02-19"),
        causeOfDeath: "Pneumonia",
        nextOfKinName: "Sarah Jones",
        nextOfKinRelationship: "Wife",
        nextOfKinContact: "567-890-1234",
        status: "INACTIVE",
        burialId: "66cc6909be12598bcc14bfad",
      },
      {
        firstName: "Fiona",
        lastName: "Davis",
        age: 59,
        dateOfBirth: new Date("1965-07-25"),
        dateOfDeath: new Date("2024-07-30"),
        causeOfDeath: "Lung Disease",
        nextOfKinName: "Michael Davis",
        nextOfKinRelationship: "Son",
        nextOfKinContact: "678-901-2345",
        status: "INACTIVE",
        burialId: "66cc6909be12598bcc14bfad",
      },
      {
        firstName: "George",
        lastName: "Miller",
        age: 73,
        dateOfBirth: new Date("1951-04-11"),
        dateOfDeath: new Date("2024-04-16"),
        causeOfDeath: "Kidney Failure",
        nextOfKinName: "Rachel Miller",
        nextOfKinRelationship: "Daughter",
        nextOfKinContact: "789-012-3456",
        status: "INACTIVE",
        burialId: "66cc6909be12598bcc14bfad",
      },
      {
        firstName: "Helen",
        lastName: "Wilson",
        age: 80,
        dateOfBirth: new Date("1944-08-20"),
        dateOfDeath: new Date("2024-08-25"),
        causeOfDeath: "Diabetes",
        nextOfKinName: "John Wilson",
        nextOfKinRelationship: "Husband",
        nextOfKinContact: "890-123-4567",
        status: "INACTIVE",
        burialId: "66cc6909be12598bcc14bfad",
      },
      {
        firstName: "Ian",
        lastName: "Moore",
        age: 67,
        dateOfBirth: new Date("1957-01-05"),
        dateOfDeath: new Date("2024-01-10"),
        causeOfDeath: "Heart Attack",
        nextOfKinName: "Laura Moore",
        nextOfKinRelationship: "Wife",
        nextOfKinContact: "901-234-5678",
        status: "INACTIVE",
        burialId: "66cc6909be12598bcc14bfad",
      },
      {
        firstName: "Julia",
        lastName: "Taylor",
        age: 77,
        dateOfBirth: new Date("1947-12-01"),
        dateOfDeath: new Date("2024-12-06"),
        causeOfDeath: "Cancer",
        nextOfKinName: "Paul Taylor",
        nextOfKinRelationship: "Son",
        nextOfKinContact: "012-345-6789",
        status: "INACTIVE",
        burialId: "66cc6909be12598bcc14bfad",
      },
    ],
  });

  console.log("10 dummy death records created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
