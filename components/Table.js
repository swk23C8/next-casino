import PropTypes from 'prop-types';
import Card from '@/components/Card';
import { ExclamationIcon } from '@heroicons/react/outline';
import { useEffect } from 'react';




const Table = ({ stats = [] }) => {

   const isEmpty = stats.length === 0;

   const toggleFavorite = async id => {
      // TODO: Add/remove home from the authenticated user's favorites
   };

   return isEmpty ? (
      <p className="text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1">
         <ExclamationIcon className="shrink-0 w-5 h-5 mt-px" />
         <span>Unfortunately, there is nothing to display yet.</span>
      </p>
   ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {/* {stats.map(stat => (
        <Card key={stat.id} {...stat} onClickFavorite={toggleFavorite} />
      ))} */}
         {console.log(stats)}
         {console.log(stats.id)}
         {console.log(stats.email)}
         {console.log(stats.gameTokens)}
         {/* insert table to show stats data */}
         <table className="table-auto">
            <thead>
               <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Game Tokens</th>
               </tr>
            </thead>
            <tbody>
               <tr key={stats.id}>
                  <td className="border px-4 py-2">{stats.id}</td>
                  <td className="border px-4 py-2">{stats.email}</td>
                  <td className="border px-4 py-2">{stats.gameTokens}</td>
               </tr>
            </tbody>
         </table>
      </div>
   );
};

Table.propTypes = {
   stat: PropTypes.array,
};

export default Table;
