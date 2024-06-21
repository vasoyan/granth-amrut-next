// services/dailydetailService.ts
import { UsersEntry } from "@/models/usersEntry";
import prisma from "../../prisma/client";
import { Prisma, dailydetail } from "@prisma/client";
import { DashboardCounts } from "@/models/dashboardCounts";

export const getAllByCurrentUser = async (
  userId?: number
): Promise<dailydetail[]> => {
  return await prisma.dailydetail.findMany({
    where: userId ? { userid: userId } : {},
  });
};

export const getByUserId = async (
  userId: number
): Promise<dailydetail[] | null> => {
  return await prisma.dailydetail.findMany({
    where: { userid: userId },
  });
};

export const getUsersWithDailyDetailsCount = async (): Promise<
  UsersEntry[]
> => {
  // Get the count of dailydetail entries grouped by user
  const dailyDetailCounts = await prisma.dailydetail.groupBy({
    by: ["userid"],
    _count: {
      _all: true,
    },
  });

  // Create a map of userId to count
  const countsMap = new Map<number, number>();
  dailyDetailCounts.forEach((item) => {
    if (item.userid) countsMap.set(item.userid, item._count._all || 0);
  });

  // Get all users
  const users = await prisma.users.findMany();

  // Map users to UsersEntry format with the count of dailydetail entries
  const result: UsersEntry[] = users.map((user) => ({
    userid: user.userid,
    username: user.username,
    useremail: user.useremail,
    count: countsMap.get(user.userid) || 0,
  }));

  return result;
};

export const getDashboardCounts = async (): Promise<DashboardCounts> => {
  const conditions: Prisma.dailydetailCountArgs[] = [
    { where: { flagpadharamni: true } },
    { where: { flagthal: true } },
    { where: { flagsabha: true } },
    { where: { flagcalendar: true } },
  ];

  // Get counts based on each condition
  const counts = await Promise.all(
    conditions.map((condition) => prisma.dailydetail.count(condition))
  );

  return {
    countPadharamni: counts[0],
    countThal: counts[1],
    countSabha: counts[2],
    countPradesh: counts[3],
    countCalender: counts[4],
  };
};

export const getAll = async (): Promise<dailydetail[]> => {
  return await prisma.dailydetail.findMany();
};

export const getById = async (id: number): Promise<dailydetail | null> => {
  return await prisma.dailydetail.findUnique({
    where: { infoid: id },
  });
};

export const create = async (data: dailydetail): Promise<dailydetail> => {
  return await prisma.dailydetail.create({
    data,
  });
};

export const update = async (
  id: number,
  data: Partial<dailydetail>
): Promise<dailydetail | null> => {
  const updateData = { ...data };
  delete updateData.infoid;

  return await prisma.dailydetail.update({
    where: { infoid: id },
    data: updateData,
  });
};

export const deleteById = async (id: number): Promise<dailydetail | null> => {
  return await prisma.dailydetail.delete({
    where: { infoid: id },
  });
};
