import {
	faBook,
	faChartPie,
	faHashtag,
	faList,
	faNewspaper,
	faPrint,
	faQuoteLeft,
	faSignOutAlt,
	faUser,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, Badge, Button, Dropdown, Image, Nav, Navbar } from '@themesberg/react-bootstrap';
import defaultAvatar from 'assets/img/avatar-default.jpeg';
// import { useHookHandleLogout } from 'constants';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import SimpleBar from 'simplebar-react';
import LogoNonText from '../assets/img/logo-wisfeed-non-text.png';
import ReactHero from '../assets/img/technologies/react-hero-logo.svg';
import { Routes } from '../routes';

export default () => {
	const location = useLocation();
	const { pathname } = location;
	const [show, setShow] = useState(false);
	const showClass = show ? 'show' : '';

	const onCollapse = () => setShow(!show);

	const userInfo = {}
	// const { handleLogout } = useHookHandleLogout();

	const history = useHistory();

	const CollapsableNavItem = ({ eventKey, title, icon, children = null }) => {
		const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : '';

		return (
			<Accordion as={Nav.Item} defaultActiveKey={defaultKey} style={{ boxShadow: 'none' }}>
				<Accordion.Item eventKey={eventKey} style={{ background: '#262b40', border: 'none' }}>
					<Accordion.Button
						as={Nav.Link}
						className='d-flex justify-content-between align-items-center'
						style={{ boder: 'none', background: '#262b40' }}
					>
						<span style={{ background: '#262b40' }}>
							<span className='sidebar-icon'>
								<FontAwesomeIcon icon={icon} />
							</span>
							<span className='sidebar-text'>{title}</span>
						</span>
					</Accordion.Button>
					<Accordion.Body className='multi-level'>
						<Nav className='flex-column'>{children}</Nav>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		);
	};

	const NavItem = props => {
		const {
			title,
			link,
			external,
			target,
			icon,
			image,
			badgeText,
			badgeBg = 'secondary',
			badgeColor = 'primary',
		} = props;
		const classNames = badgeText ? 'd-flex justify-content-start align-items-center justify-content-between' : '';
		const navItemClassName = link === pathname ? 'active' : '';
		const linkProps = external ? { href: link } : { as: Link, to: link };

		return (
			<Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
				<Nav.Link {...linkProps} target={target} className={classNames}>
					<span>
						{icon ? (
							<span className='sidebar-icon'>
								<FontAwesomeIcon icon={icon} />{' '}
							</span>
						) : null}
						{image ? <Image src={image} width={20} height={20} className='sidebar-icon svg-icon' /> : null}

						<span className='sidebar-text'>{title}</span>
					</span>
					{badgeText ? (
						<Badge pill bg={badgeBg} text={badgeColor} className='badge-md notification-count ms-2'>
							{badgeText}
						</Badge>
					) : null}
				</Nav.Link>
			</Nav.Item>
		);
	};

	const editAdmin = () => {
		history.push(`/edit-user/${userInfo.id}`);
	};

	return (
		<>
			<Navbar expand={false} collapseOnSelect variant='dark' className='navbar-theme-primary px-4 d-md-none'>
				<Navbar.Brand className='me-lg-5' as={Link} to={Routes.DashboardOverview.path}>
					<Image src={ReactHero} className='navbar-brand-light' />
				</Navbar.Brand>
				<Navbar.Toggle as={Button} aria-controls='main-navbar' onClick={onCollapse}>
					<span className='navbar-toggler-icon' />
				</Navbar.Toggle>
			</Navbar>
			<CSSTransition timeout={300} in={show} classNames='sidebar-transition'>
				<SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
					<div className='sidebar-inner px-4 pt-3'>
						<div className='user-card d-flex align-items-center justify-content-between justify-content-md-center pb-4'>
							<div className='d-flex align-items-center'>
								<div className='user-avatar lg-avatar me-4'>
									<Image
										src={userInfo.avatarImage || defaultAvatar}
										role='button'
										className='card-img-top rounded-circle border-white h-100'
										alt='avatar'
										onClick={editAdmin}
									/>
								</div>
								<div className='d-block'>
									<h6>Hi, {userInfo.lastName}</h6>
									<Button
										variant='secondary'
										size='xs'
										className='text-dark'
										style={{ verticalAlign: 'baseline' }}
										// onClick={handleLogout}
									>
										<FontAwesomeIcon icon={faSignOutAlt} className='me-2' />
										Logout
									</Button>
								</div>
							</div>
						</div>
						<div className='sidebar__logo'>
							<img src={LogoNonText} alt='logo' />
							<p>WisFeed Admin</p>
						</div>
						<Nav className='flex-column pt-2'>
							<NavItem title='Tổng quát' link={Routes.DashboardOverview.path} icon={faChartPie} />
							<CollapsableNavItem eventKey='books-manager/' title='Sách' icon={faBook}>
								<NavItem title='Danh sách sách' link={Routes.Books.path} />
								<NavItem title='Duyệt sách' link={Routes.BookApproval.path} />
								<NavItem title='Xác thực sách' link={Routes.ConfirmMyBook.path} />
							</CollapsableNavItem>
							<NavItem title='Người dùng' icon={faUser} link={Routes.Users.path} />
							<NavItem title='Nhóm' link={Routes.Groups.path} icon={faUsers} />
							<NavItem title='Quotes' link={Routes.Quotes.path} icon={faQuoteLeft} />
							<CollapsableNavItem eventKey='feed-manager/' title='Bài viết' icon={faNewspaper}>
								<NavItem title='New Feed' link={Routes.NewFeed.path} />
								<NavItem title='Group Feed' link={Routes.GroupFeed.path} />
								<NavItem title='Bài viết nổi bật' link={Routes.PopularFeed.path} />
							</CollapsableNavItem>
							<NavItem title='Chủ đề' link={Routes.Category.path} icon={faList} />
							<NavItem title='Hashtag' link={Routes.Hashtag.path} icon={faHashtag} />
							<NavItem title='Nhà xuất bản' link={Routes.Publisher.path} icon={faPrint} />
							<Dropdown.Divider className='my-3 border-indigo' />
						</Nav>
					</div>
				</SimpleBar>
			</CSSTransition>
		</>
	);
};
