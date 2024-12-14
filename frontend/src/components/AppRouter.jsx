import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { animated, useTransition } from 'react-spring';
import { authRoutes, publicRoutes } from "../routes";
import { WebSocketProvider } from "../WebSocket/WebSocketContext";

export default function AppRouter() {
	const isAuth = false; //TODO: take isAuth from back
	const location = useLocation();

	const  getAnimationProps = (pathname) => {
		switch (true) {
			case pathname.startsWith('/questionsController'):
				return {
					from: { 
					  opacity: 0, 
					  transform: `translate3d(100%, 0, 0)`, 
					  position: 'absolute',
					  width: '100%' ,
					  height: '100%'
					},
					enter: { 
					  opacity: 1, 
					  transform: `translate3d(0, 0, 0)`, 
					  position: 'absolute',
					  width: '100%' ,
					  height: '100%'
					},
					leave: { 
					  opacity: 0, 
					  transform: `translate3d(-100%, 0, 0)`, 
					  position: 'absolute',
					  width: '100%',
					  height: '100%'
					}
				  };
			
			case pathname.startsWith('/admin'):
			  return {
				from: {
				  opacity: 0,
				  position: 'absolute', 
				  width: '100%',
				  height: '100%',
				  transform: 'translate3d(0, 0, 0)'
				},
				enter: { 
				  opacity: 1, 
				  transform: 'translate3d(0, 0, 0)',
				  position: 'absolute', 
				  width: '100%' ,
				  height: '100%',
				},
				leave: { 
				  opacity: 0, 
				  transform: 'translate3d(0, 0, 0)',
				  position: 'absolute', 
				  width: '100%' ,
				  height: '100%'
				},
				config: { duration: 0 },
				key: location.key 
			  };
			
			default:
			  return {
				from: {
				  opacity: 0,
				  position: 'absolute', 
				  width: '100%',
				  height: '100%',
				  transform: 'translate3d(0, 0, 0)'
				},
				enter: { 
				  opacity: 1, 
				  transform: 'translate3d(0, 0, 0)',
				  position: 'absolute', 
				  width: '100%' ,
				  height: '100%'
				},
				leave: { 
				  opacity: 0, 
				  transform: 'translate3d(0, 0, 0)',
				  position: 'absolute', 
				  width: '100%' ,
				  height: '100%'
				},
				key: location.key
			  };
		  }
		  
	}

	const transitions = useTransition(location, {
		...getAnimationProps(location.pathname),
		key: location.key,
	});

	return transitions((style, item) => (
		<animated.div key={item.key} style={style}>
			<Routes location={item}>
				{isAuth &&
					authRoutes.map(({ path, Component }) => (
						<Route key={path} path={path} element={<Component />} />
					))}
				{publicRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
			</Routes>
		</animated.div>
	));
}
