"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteServiceCategory } from "@/app/actions/services";

export function CategoryActions({
  categoryId,
  categorySlug,
}: {
  categoryId: string;
  categorySlug: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteServiceCategory(categoryId);
      startTransition(() => {
        router.refresh();
      });
    }
  };

  return (
    <>
      <Link
        href={`/admin/services/${categorySlug}/edit`}
        className="text-indigo-600 hover:text-indigo-900 mr-4"
      >
        Edit
      </Link>
      <button
        className="text-red-600 hover:text-red-900"
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </>
  );
}
