import { useEffect, useState, useReducer, useCallback, Component, useRef, useMemo } from 'react';
import Image from 'next/image'
import axios from 'axios';
import { data } from 'autoprefixer';
import Shrek from 'public/images/feltCute.png';
import Pootin from 'public/images/monke_pootin.png';
import Egg from 'public/images/egg.png';

import dynamic from 'next/dynamic';
const PixiApp = dynamic(
	() => import('../PixiApp/PixiApp'),
	{ ssr: false }
);

const Play = ({ stats = [], game = [] }) => {

	return (
		<>
			<p>Hi!</p>
			<PixiApp />
		</>
	);
}

export default Play;