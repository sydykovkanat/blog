'use client';

import { LogOutIcon } from 'lucide-react';

import { IUser } from '@/features/auth/types';
import { useLogoutMutation } from '@/features/user/hooks';

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Skeleton,
} from '@/shared/components/ui';

interface Props {
	user: IUser;
}

export function UserButton({ user }: Props) {
	const { isLoadingLogout, logout } = useLogoutMutation();

	if (!user) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					{user.picture && <AvatarImage src={user.picture} />}
					<AvatarFallback>{user.displayName.slice(0, 1)}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem disabled={isLoadingLogout} onClick={() => logout()}>
					<LogOutIcon />
					Выйти
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function UserButtonLoading() {
	return <Skeleton className={'size-8 rounded-full'} />;
}
