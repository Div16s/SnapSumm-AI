import NavLink from './navLink';
import { FileText } from 'lucide-react';
import UserDropdown from '@/components/common/userDropDown';
import PlanBadge from '@/components/common/planBadge';
import { getCurrentUser } from '@/lib/getCurrentUser';

const header = async () => {
  const currentUser = await getCurrentUser();
  const isAuthenticated = (currentUser === null ? false : true);
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink href={'/'} className="flex items-center gap-1 lg:gap-2 ">
          <FileText className="h-5 w-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold text-gray-900 lg:text-xl">
            SnapSumm
          </span>
        </NavLink>
      </div>

      <div className="flex font-bold lg:justify-center gap-4 lg:gap-12 lg:items-center">
        {isAuthenticated ? 
          <NavLink href='/dashboard' className='hover:text-blue-500'>Your Snaps</NavLink>
        : 
          <NavLink href='/#pricing' className='hover:text-blue-500'>Pricing</NavLink>
        }
      </div>

      <div className="flex font-bold lg:justify-end lg:flex-1">
        {isAuthenticated ? 
          <div className="flex gap-2 items-center">
            <NavLink href='/upload' className='hover:text-blue-500'>Upload PDF</NavLink>
            <PlanBadge />
            {isAuthenticated && <UserDropdown />}
          </div> 
        : 
          <div>
            <NavLink href='/auth/sign-in'>Sign In</NavLink>
          </div>
        }
      </div>
    </nav>
  )
}

export default header