
import {
	ADMIN_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	VOTES_ROUTE,
	POLL_ROUTE,
	QUESTION_ROUTE,
	POLL_RESULT_ROUTE,
	POLL_ADMIN_ROUTE,
	QUESTION_CONTROLL_ROUTE,
} from "./utils/consts";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Votes from "./pages/Votes";
import PollPage from "./pages/startPoll";
import Question from "./pages/clientQuestions";
import PollResult from "./pages/Results";
import QuestionControll from "./pages/questionsControll";
import { Component } from "react";

export const authRoutes = [{ path: ADMIN_ROUTE, Component: Admin }];
export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		Component: Auth,
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Auth,
	},
	{
		path: VOTES_ROUTE,
		Component: Votes,
	},
	{
		path: POLL_ROUTE + "/:id",
		Component: PollPage,
	},
	{
		path: QUESTION_ROUTE + "/:id",
		Component: Question,
	},
	{
		path: POLL_RESULT_ROUTE + "/:id",
		Component: PollResult,
	},
	{
		path: ADMIN_ROUTE,
		Component: Admin,
	},
	{
		path: QUESTION_CONTROLL_ROUTE + '/:id',
		Component: QuestionControll
	}
];
