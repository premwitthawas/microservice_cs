"use server";

import { auth } from "@/auth";

export const fetchCurrentProfile = async () => {
  try {
    const session = await auth();

    if (!session) return null;

    return session.user;
  } catch (err) {
    return null;
  }
};
