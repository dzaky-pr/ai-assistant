'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { Bot, Users } from 'lucide-react'
import { Spinner } from './ui/spinner'

function UserButtonCustom() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <Spinner />
  }

  const role = user?.publicMetadata?.role

  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="Tanya AI"
          labelIcon={<Bot size={14} />}
          href="/dashboard/chat"
        />
      </UserButton.MenuItems>

      {role === 'admin' && (
        <UserButton.MenuItems>
          <UserButton.Link
            label="Manage Users"
            labelIcon={<Users size={14} />}
            href="/dashboard/manage-users"
          />
        </UserButton.MenuItems>
      )}
    </UserButton>
  )
}

export default UserButtonCustom
