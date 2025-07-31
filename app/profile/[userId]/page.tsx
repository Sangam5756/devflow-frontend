"use client"
import { useParams } from 'next/navigation';

export default function UserProfilePage() {
    const params = useParams();

  return (
    <div className="p-8">
      User Profile Page (Dynamic){JSON.stringify(params)}
    </div>
  );
}