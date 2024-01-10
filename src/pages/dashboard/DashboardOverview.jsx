import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';
import { CounterWidget } from '../../components/Widgets';

export default () => {
	// const [trackingInteractData, setTrackingInteractData] = useState({});
	// const [numberMiniPostToday, setNumberMiniPostToday] = useState(0);
	// const [percentagePost, setPercentagePost] = useState(0);
	// const [totalUsers, setTotalUsers] = useState(0);
	// const [todayDate, setTodayDate] = useState('');

	// const dispatch = useDispatch();
	// const today = new Date();

	// useEffect(() => {
	// 	const dayTemp = new Date();
	// 	const data = [];
	// 	for (let i = 6; i >= 0; i--) {
	// 		dayTemp.setDate(today.getDate() - i);
	// 		const dayTemp2 = dayTemp.toISOString().split('T')[0];
	// 		data.push(dayTemp2);
	// 	}

	// 	getReportTrackingAccounts();
	// 	getReportTrackingInteract();
	// 	handleGetPercentageUser();

	// 	const todayNameObj = {
	// 		0: 'Chủ nhật',
	// 		1: 'Thứ hai',
	// 		2: 'Thứ ba',
	// 		3: 'Thứ tư',
	// 		4: 'Thứ năm',
	// 		5: 'Thứ sáu',
	// 		6: 'Thứ bảy',
	// 	};

	// 	setTodayDate(`${todayNameObj[today.getDay()]} - Ngày ${today.getDate()} Tháng ${today.getMonth() + 1}`);
	// }, []);

	// const getReportTrackingAccounts = async dateData => {
	// 	let params = {};
	// 	if (dateData) {
	// 		params = {
	// 			filter: [{ 'operator': '<=', 'value': dateData, 'property': 'createdAt' }],
	// 		};
	// 	}
	// 	try {
	// 		const res = await dispatch(trackingAccounts(params)).unwrap();

	// 		setTotalUsers(res.all);
	// 	} catch (error) {
	// 		NotificationError(error);
	// 	}
	// };

	// const getReportTrackingInteract = async () => {
	// 	const params = {
	// 		start: 0,
	// 		limit: 7,
	// 		sort: JSON.stringify([{ property: 'createdAt', direction: 'DESC' }]),
	// 	};

	// 	try {
	// 		const res = await dispatch(trackingInteract(params)).unwrap();
	// 		const labelData = res.reverse().map(item => {
	// 			const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
	// 			const date = new Date(item.createdAt.split('T')[0]);
	// 			return daysOfWeek[date.getDay()];
	// 		});

	// 		const seriesData = res.map(item => item.miniPost);

	// 		setTrackingInteractData({ labels: labelData, series: [seriesData] });
	// 		setNumberMiniPostToday(res.at(-1).miniPost);

	// 		const percentage = ((res.at(-1).miniPost - res.at(-2).miniPost) * 100) / res.at(-2).miniPost;
	// 		if (!isNaN(percentage) && percentage !== Infinity) {
	// 			setPercentagePost(percentage.toFixed(2));
	// 		}
	// 	} catch (error) {
	// 		NotificationError(error);
	// 	}
	// };

	// const handleGetPercentageUser = () => {
	// 	// lấy số liệu người dùng ngày cuối cùng tháng trước
	// 	const d = new Date(); // current date
	// 	d.setDate(1); // going to 1st of the month
	// 	d.setHours(-1); // going to last hour before this date even started.
	// 	getReportTrackingAccounts(d);
	// };

	return (
		<>
			{/* <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
				<Dropdown className='btn-toolbar'>
					<Dropdown.Toggle
						as={Button}
						variant='primary'
						size='sm'
						className='me-2'
					>
						<FontAwesomeIcon icon={faPlus} className='me-2' />
						New Task
					</Dropdown.Toggle>
					<Dropdown.Menu className='dashboard-dropdown dropdown-menu-left mt-2'>
						<Dropdown.Item className='fw-bold'>
							<FontAwesomeIcon icon={faTasks} className='me-2' />{' '}
							New Task
						</Dropdown.Item>
						<Dropdown.Item className='fw-bold'>
							<FontAwesomeIcon
								icon={faCloudUploadAlt}
								className='me-2'
							/>{' '}
							Upload Files
						</Dropdown.Item>
						<Dropdown.Item className='fw-bold'>
							<FontAwesomeIcon
								icon={faUserShield}
								className='me-2'
							/>{' '}
							Preview Security
						</Dropdown.Item>

						<Dropdown.Divider />

						<Dropdown.Item className='fw-bold'>
							<FontAwesomeIcon
								icon={faRocket}
								className='text-danger me-2'
							/>{' '}
							Upgrade to Pro
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

				<ButtonGroup>
					<Button variant='outline-primary' size='sm'>
						Share
					</Button>
					<Button variant='outline-primary' size='sm'>
						Export
					</Button>
				</ButtonGroup>
			</div> */}

			<h4 className='py-4'>Tổng quan</h4>
			<Row className='justify-content-md-center'>
				<Col xs={12} className='mb-4 d-sm-block'>
					{/* <LineChartWidget
						title='Số lượng bài viết theo ngày'
						chartData={trackingInteractData}
						totalValue={numberMiniPostToday}
						percentage={percentagePost}
					/> */}
				</Col>

				{/* <Col xs={12} className='mb-4 d-sm-none'>
					<SalesValueWidgetPhone title='Sales Value' value='10,567' percentage={10.57} />
				</Col> */}
				<Col xs={12} sm={6} xl={4} className='mb-4'>
					<CounterWidget
						category='Người dùng'
						title={1}
						period={1}
						percentage={18.2}
						icon={faChartLine}
						iconColor='shape-secondary'
					/>
				</Col>

				{/* <Col xs={12} sm={6} xl={4} className='mb-4'>
					<CounterWidget
						category='Doanh thu'
						title='$43,594'
						period={todayDate}
						percentage={28.4}
						icon={faCashRegister}
						iconColor='shape-tertiary'
					/>
				</Col>

				<Col xs={12} sm={6} xl={4} className='mb-4'>
					<CircleChartWidget title='Traffic Share' data={trafficShares} />
				</Col> */}
			</Row>

			{/* <Row>
				<Col xs={12} xl={12} className='mb-4'>
					<Row>
						<Col xs={12} xl={8} className='mb-4'>
							<Row>
								<Col xs={12} className='mb-4'>
									<PageVisitsTable />
								</Col>

								<Col xs={12} lg={6} className='mb-4'>
									<TeamMembersWidget />
								</Col>

								<Col xs={12} lg={6} className='mb-4'>
									<ProgressTrackWidget />
								</Col>
							</Row>
						</Col>

						<Col xs={12} xl={4}>
							<Row>
								<Col xs={12} className='mb-4'>
									<BarChartWidget
										title='Total orders'
										value={452}
										percentage={18.2}
										data={totalOrders}
									/>
								</Col>

								<Col xs={12} className='px-0 mb-4'>
									<RankingWidget />
								</Col>

								<Col xs={12} className='px-0'>
									<AcquisitionWidget />
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row> */}
		</>
	);
};
