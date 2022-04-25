import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';

const Card = ({
   id = '',
   gameTokens = 0,
   createdAt = '',
}) => (
   // <Link href={`/users/${id}`}>
   <a className="block w-full">
      <div className="relative">
         <div className="bg-gray-200 rounded-lg shadow overflow-hidden aspect-w-16 aspect-h-9">
         </div>
      </div>
      <div className="mt-2 w-full text-gray-700 font-semibold leading-tight">
         {id ?? ''}
      </div>
      <ol className="mt-1 inline-flex items-center space-x-1 text-gray-500">
         <li>
            <span>{gameTokens ?? 0} Tokens</span>
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
