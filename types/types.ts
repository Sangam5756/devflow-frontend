import type { Session } from "next-auth";

export type NavbarProps = {
    session: Session | null;
};
