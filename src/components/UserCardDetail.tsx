"use client";

import { UserCardDetailProps } from "@/libs/types";
import { IconMailForward, IconMapPins } from "@tabler/icons-react";

export default function UserCardDetail({ email, address }: UserCardDetailProps) {
  return (
    <div className="text-center">
      <p>
        <IconMailForward /> {email}
      </p>
      <p>
        <IconMapPins /> {address}
      </p>
    </div>
  );
}
