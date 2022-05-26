import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import {
   HeartIcon,
   HomeIcon,
   LogoutIcon,
   PlusIcon,
   SparklesIcon,
   UserIcon,
   PuzzleIcon,
   SupportIcon,
   QuestionMarkCircleIcon,
   CogIcon,
   DocumentTextIcon,
   InformationCircleIcon,
} from '@heroicons/react/outline';

const Card = ({
   id = '',
   gameTokens = 0,
   createdAt = '',
}) => (
   // <Link href={`/users/${id}`}>
   <a className="block w-full border border-sky-500 hover:border-2 rounded-md">
      {/* <div className="relative"> */}
      {/* <UserIcon className="left-0 w-8 h-8 text-gray-500" /> */}

      {/* <div className="bg-gray-200 rounded-lg shadow overflow-hidden aspect-w-16 aspect-h-9">
            <UserIcon className="absolute top-0 left-0 w-8 h-8 text-gray-500" />
         </div> */}
      {/* </div> */}
      <div className="flex mt-2 w-full text-gray-700 font-semibold leading-tight">
         <UserIcon className="left-0 w-8 h-8 text-gray-500" />
         {id ?? ''}
      </div>
      <ol className="mt-1 inline-flex items-center space-x-1 text-gray-500">
         <li>
            <span>&nbsp;${gameTokens ?? 0}</span>
            <span aria-hidden="true"> | </span>
         </li>
         <li>
            <span>
               {
                  new Date(createdAt).toLocaleDateString(
                     'en-US',
                     {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                     },
                  )
                  // createdAt.toString() ?? 0
               }
               {" "}Creation Date
            </span>
         </li>
      </ol>
      {/* <p className="mt-2">
         {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
         }).format(price ?? 0)}{' '}
         <span className="text-gray-500">/night</span>
      </p> */}
   </a>
   // </Link>
);

Card.propTypes = {
   id: PropTypes.string.isRequired,
   createdAt: PropTypes.string,
   gameTokens: PropTypes.number,
};

export default Card;
