import Link from "next/link";
import React from "react";

type Props = {};

const Nav = (props: Props) => {
  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>My site</div>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          <Link href="/CreateUser">Create User</Link>
          <Link href="/ClientMember">Client Member</Link>
          <Link href="/Denied">Denied</Link>
          <Link href="/Member">Member</Link>
          <Link href="public">Public</Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
