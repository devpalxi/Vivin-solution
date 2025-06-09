"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteSubcategory } from "@/app/actions/services";
import Link from "next/link";

export function SubcategoryActions({
  subcategoryId,
  categorySlug,
  subcategorySlug,
}: {
  subcategoryId: string;
  categorySlug: string;
  subcategorySlug: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this subcategory?")) {
      await deleteSubcategory(subcategoryId);
      startTransition(() => {
        router.refresh();
      });
    }
  };

  return (
    <>
      <Link
        href={`/admin/services/${categorySlug}/subcategories/${subcategorySlug}/edit`}
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
