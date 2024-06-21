// services/usersService.ts
import prisma from "../../prisma/client";
import { users } from "@prisma/client";

export const getAll = async (): Promise<users[]> => {
  return await prisma.users.findMany();
};

export const getById = async (id: number): Promise<users | null> => {
  return await prisma.users.findUnique({
    where: { userid: id },
  });
};

export const login = async (
  username: string,
  userpass: string
): Promise<users | null> => {
  try {
    const user = await prisma.users.findUnique({
      where: { username: username, userpass: userpass },
    });
    return user;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

export const create = async (data: users): Promise<users> => {
  return await prisma.users.create({
    data,
  });
};

export const update = async (
  id: number,
  data: Partial<users>
): Promise<users | null> => {
  const updateData = { ...data };
  delete updateData.userid;

  return await prisma.users.update({
    where: { userid: id },
    data: updateData,
  });
};

export const deleteById = async (id: number): Promise<users | null> => {
  return await prisma.users.delete({
    where: { userid: id },
  });
};
