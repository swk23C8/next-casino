import PropTypes from 'prop-types';
import Card from '@/components/Card';
import Table from '@/components/Table';
import { ExclamationIcon } from '@heroicons/react/outline';

const Grid = ({ stats = [] }) => {
  const isEmpty = stats.length === 0;

  // const toggleFavorite = async id => {
  //   // TODO: Add/remove home from the authenticated user's favorites
  // };

  return isEmpty ? (
    <p className="text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1">
      <ExclamationIcon className="shrink-0 w-5 h-5 mt-px" />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map(stat => (
        <Card key={stat.id} {...stat} />
      ))}
    </div>
    // <>
    //   {stats.map(stat => (
    //     <Table key={stat.id} {...stat} />
    //   ))}
    // </>
  );
};

Grid.propTypes = {
  stat: PropTypes.array,
};

export default Grid;
