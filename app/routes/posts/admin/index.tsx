import { Link } from "@remix-run/react";

export default function AdminIndexRoute() {
  return (
    <Link className="text-blue-600 underline" to="new">Create new post</Link>
  )
}