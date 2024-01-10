import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from './routes';
// import { getCheckJwt } from 'reducers/auth';

// pages
import DashboardOverview from 'pages/dashboard/DashboardOverview';
import ForgotPassword from 'pages/examples/ForgotPassword';
import Login from 'pages/examples/Login';
import NotFoundPage from 'pages/examples/NotFound';
import ResetPassword from 'pages/examples/ResetPassword';
import ServerError from 'pages/examples/ServerError';
// import CreatePost from 'pages/Feed/CreatePost';

// components
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import Preloader from 'components/Preloader';
import Sidebar from 'components/Sidebar';

const RouteHasNotSidebar = ({ component: Component, ...rest }) => {
	return <Route {...rest} render={props => <Component {...props} />} />;
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<Route
			{...rest}
			render={props => (
				<>
					<Preloader show={loaded ? false : true} />
					<Sidebar />
					<main className='content'>
						<div>
							<Navbar />
							<Component {...props} />
						</div>
						<Footer />
					</main>
				</>
			)}
		/>
	);
};

export default function App() {
	// const history = useHistory();
	// const dispatch = useDispatch();

	// const updateMyLibrary = useSelector(state => state.library.updateMyLibrary);
	// const { userInfo } = useSelector(state => state.auth);

	// useEffect(async () => {
	// 	const accsetToken = sessionStorage.getItem('accessToken');
	// 	if (accsetToken) {
	// 		await dispatch(getCheckJwt()).unwrap();
	// 	} else {
	// 		history.push('/login');
	// 	}
	// }, []);

	// useEffect(() => {
	// 	if (!_.isEmpty(userInfo)) {
	// 		getAllMyLibrary(userInfo.id);
	// 	}
	// }, [userInfo, updateMyLibrary]);

	// const getAllMyLibrary = async userId => {
	// 	try {
	// 		const data = await dispatch(getAllLibraryList({ userId })).unwrap();
	// 		dispatch(setAllMyLibraryRedux(data));
	// 	} catch (err) {
	// 		NotificationError(err);
	// 	}
	// };

	return (
		<Switch>
			<RouteHasNotSidebar exact path={Routes.Login.path} component={Login} />
			<RouteHasNotSidebar exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
			<RouteHasNotSidebar exact path={Routes.ResetPassword.path} component={ResetPassword} />
			<RouteHasNotSidebar exact path={Routes.NotFound.path} component={NotFoundPage} />
			<RouteHasNotSidebar exact path={Routes.ServerError.path} component={ServerError} />

			{/* pages */}
			<RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
			{/* <RouteWithSidebar exact path={Routes.Users.path} component={Users} />
			<RouteWithSidebar exact path={Routes.EditUser.path} component={EditUser} />
			<RouteWithSidebar exact path={Routes.Books.path} component={Books} />
			<RouteWithSidebar exact path={Routes.CreateBook.path} component={BookInformations} />
			<RouteWithSidebar exact path={Routes.BookApproval.path} component={BookApproval} />
			<RouteWithSidebar exact path={Routes.ConfirmMyBook.path} component={ConfirmMyBook} />
			<RouteWithSidebar exact path={Routes.Quotes.path} component={Quotes} />
			<RouteWithSidebar exact path={Routes.QuotesDetail.path} component={QuotesDetails} />
			<RouteWithSidebar exact path={Routes.DetailGroupFeed.path} component={DetailGroupFeed} />
			<RouteWithSidebar exact path={Routes.DetailNewFeed.path} component={DetailNewFeed} />
			<RouteWithSidebar exact path={Routes.Groups.path} component={Groups} />
			<RouteWithSidebar exact path={Routes.Category.path} component={Category} />
			<RouteWithSidebar exact path={Routes.Hashtag.path} component={Hashtag} />
			<RouteWithSidebar exact path={Routes.Publisher.path} component={Publisher} /> */}
			{/* <RouteWithSidebar exact path={Routes.CreatePost.path} component={CreatePost} /> */}
			{/* <RouteWithSidebar exact path={Routes.EditBook.path} component={BookInformations} />
			<RouteWithSidebar exact path={Routes.NewFeed.path} component={NewFeed} />
			<RouteWithSidebar exact path={Routes.GroupFeed.path} component={GroupFeed} />
			<RouteWithSidebar exact path={Routes.PopularFeed.path} component={PopularFeed} /> */}

			<Redirect to={Routes.NotFound.path} />
		</Switch>
	);
}
