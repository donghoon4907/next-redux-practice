import type { FC } from 'react';
import { useState } from 'react';
import { Header } from '@layouts/header/Header';
import { Sidebar } from '@layouts/sidebar';
import {
    Row,
    Col,
    Button,
    CardHeader,
    Card,
    CardBody,
    Progress,
    TabContent,
    TabPane,
} from 'reactstrap';
import {
    AreaChart,
    Area,
    Line,
    ResponsiveContainer,
    Bar,
    BarChart,
    ComposedChart,
    CartesianGrid,
    Tooltip,
    LineChart,
} from 'recharts';

type Tab = 'tab1' | 'tab2';

const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page C', uv: 2000, pv: 6800, amt: 2290 },
    { name: 'Page D', uv: 4780, pv: 7908, amt: 2000 },
    { name: 'Page E', uv: 2890, pv: 9800, amt: 2181 },
    { name: 'Page F', uv: 1390, pv: 3800, amt: 1500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const data2 = [
    { name: 'Page A', uv: 5400, pv: 5240, amt: 1240 },
    { name: 'Page B', uv: 7300, pv: 4139, amt: 3221 },
    { name: 'Page C', uv: 8200, pv: 7980, amt: 5229 },
    { name: 'Page D', uv: 6278, pv: 4390, amt: 3200 },
    { name: 'Page E', uv: 3189, pv: 7480, amt: 6218 },
    { name: 'Page D', uv: 9478, pv: 6790, amt: 2200 },
    { name: 'Page E', uv: 1289, pv: 1980, amt: 7218 },
    { name: 'Page F', uv: 3139, pv: 2380, amt: 5150 },
    { name: 'Page G', uv: 5349, pv: 3430, amt: 3210 },
];

export const Dashboard: FC = () => {
    const [tab, setTab] = useState<Tab>('tab1');

    const handleTab = (tab: Tab) => {
        setTab(tab);
    };

    const isActiveFirstTab = tab === 'tab1';

    const isActiveSecondTab = tab === 'tab2';

    return (
        <>
            <Header />
            <div className="app-main">
                <Sidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <Row>
                            <Col md="12" lg="6">
                                <Card className="mb-3">
                                    <CardHeader className="card-header-tab">
                                        <div className="card-header-title">
                                            <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure">
                                                {' '}
                                            </i>
                                            Bandwidth Reports
                                        </div>
                                        <div className="btn-actions-pane-right">
                                            <Button
                                                outline
                                                className={`border-0 btn-pill btn-wide btn-transition ${
                                                    isActiveFirstTab
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                color="primary"
                                                onClick={() =>
                                                    handleTab('tab1')
                                                }
                                            >
                                                Tab 1
                                            </Button>
                                            <Button
                                                outline
                                                className={`ms-1 btn-pill btn-wide border-0 btn-transition ${
                                                    tab === 'tab2'
                                                        ? 'active'
                                                        : ''
                                                }`}
                                                color="primary"
                                                onClick={() =>
                                                    handleTab('tab2')
                                                }
                                            >
                                                Tab 2
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <TabContent activeTab={tab}>
                                        <TabPane tabId="tab1">
                                            <CardBody className="pt-2">
                                                <Row className="mt-3">
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left me-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            63%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Generated
                                                                            Leads
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="danger"
                                                                        value="63"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left me-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            32%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Submitted
                                                                            Tickers
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="success"
                                                                        value="32"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="divider mt-4" />
                                                <Row>
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left me-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            71%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Server
                                                                            Allocation
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="primary"
                                                                        value="71"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left me-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            41%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Generated
                                                                            Leads
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="warning"
                                                                        value="41"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                            <div className="widget-chart p-0">
                                                <div className="widget-chart-content">
                                                    <div className="widget-description mt-0 text-warning">
                                                        {/* <FontAwesomeIcon
                                                            icon={faArrowLeft}
                                                        /> */}
                                                        <span className="ps-1">
                                                            175.5%
                                                        </span>
                                                        <span className="text-muted opacity-8 ps-1">
                                                            increased server
                                                            resources
                                                        </span>
                                                    </div>
                                                </div>
                                                <ResponsiveContainer
                                                    height={187}
                                                >
                                                    <AreaChart
                                                        data={data}
                                                        margin={{
                                                            top: -45,
                                                            right: 0,
                                                            left: 0,
                                                            bottom: 0,
                                                        }}
                                                    >
                                                        <defs>
                                                            <linearGradient
                                                                id="colorPv2"
                                                                x1="0"
                                                                y1="0"
                                                                x2="0"
                                                                y2="1"
                                                            >
                                                                <stop
                                                                    offset="10%"
                                                                    stopColor="#f7b924"
                                                                    stopOpacity={
                                                                        0.7
                                                                    }
                                                                />
                                                                <stop
                                                                    offset="90%"
                                                                    stopColor="#f7b924"
                                                                    stopOpacity={
                                                                        0
                                                                    }
                                                                />
                                                            </linearGradient>
                                                        </defs>
                                                        <Tooltip />
                                                        <Area
                                                            type="monotoneX"
                                                            dataKey="uv"
                                                            stroke="#f7b924"
                                                            strokeWidth={2}
                                                            fillOpacity={1}
                                                            fill="url(#colorPv2)"
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="tab2">
                                            <div className="widget-chart p-0">
                                                <ResponsiveContainer
                                                    height={179}
                                                >
                                                    <ComposedChart data={data2}>
                                                        <CartesianGrid stroke="#ffffff" />
                                                        <Area
                                                            type="monotone"
                                                            dataKey="amt"
                                                            fill="#f7ffd0"
                                                            stroke="#85a200"
                                                        />
                                                        <Bar
                                                            dataKey="pv"
                                                            barSize={16}
                                                            fill="#545cd8"
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="uv"
                                                            strokeWidth="3"
                                                            stroke="#d92550"
                                                        />
                                                    </ComposedChart>
                                                </ResponsiveContainer>
                                                <div className="widget-chart-content mt-3 mb-2">
                                                    <div className="widget-description mt-0 text-success">
                                                        {/* <FontAwesomeIcon
                                                            icon={faArrowUp}
                                                        /> */}
                                                        <span className="ps-2 pe-2">
                                                            37.2%
                                                        </span>
                                                        <span className="text-muted opacity-8">
                                                            performance increase
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <CardBody className="pt-2">
                                                <Row>
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left me-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            23%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Deploys
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="warning"
                                                                        value="23"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left me-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            76%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Traffic
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="info"
                                                                        value="76"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="divider mt-4" />
                                                <Row>
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left me-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            83%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Servers
                                                                            Load
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="danger"
                                                                        value="83"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="widget-content">
                                                            <div className="widget-content-outer">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left me-3">
                                                                        <div className="widget-numbers fsize-3 text-muted">
                                                                            48%
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right">
                                                                        <div className="text-muted opacity-6">
                                                                            Reported
                                                                            Bugs
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="widget-progress-wrapper mt-1">
                                                                    <Progress
                                                                        className="progress-bar-sm progress-bar-animated-alt"
                                                                        color="alternate"
                                                                        value="48"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </TabPane>
                                    </TabContent>
                                </Card>
                                <Row>
                                    <Col lg="6">
                                        <div className="card mb-3 widget-chart">
                                            <div className="widget-chart-content">
                                                <div className="icon-wrapper rounded-circle">
                                                    <div className="icon-wrapper-bg bg-primary" />
                                                    <i className="lnr-cog text-primary" />
                                                </div>
                                                <div className="widget-numbers">
                                                    45.8k
                                                </div>
                                                <div className="widget-subheading">
                                                    Total Views
                                                </div>
                                                <div className="widget-description text-success">
                                                    {/* <FontAwesomeIcon icon={faAngleUp}/> */}
                                                    <span className="ps-1">
                                                        175.5%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="widget-chart-wrapper chart-wrapper-relative">
                                                <ResponsiveContainer
                                                    height={100}
                                                >
                                                    <LineChart
                                                        data={data}
                                                        margin={{
                                                            top: 5,
                                                            right: 5,
                                                            left: 5,
                                                            bottom: 0,
                                                        }}
                                                    >
                                                        <Line
                                                            type="monotone"
                                                            dataKey="pv"
                                                            stroke="#3ac47d"
                                                            strokeWidth={3}
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="6">
                                        <div className="card mb-3 widget-chart">
                                            <div className="widget-chart-content">
                                                <div className="icon-wrapper rounded-circle">
                                                    <div className="icon-wrapper-bg bg-danger" />
                                                    <i className="lnr-laptop-phone text-danger" />
                                                </div>
                                                <div className="widget-numbers">
                                                    5.82k
                                                </div>
                                                <div className="widget-subheading">
                                                    Reports Submitted
                                                </div>
                                                <div className="widget-description text-danger">
                                                    {/* <FontAwesomeIcon icon={faAngleDown}/> */}
                                                    <span className="ps-1">
                                                        54.1%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="widget-chart-wrapper chart-wrapper-relative">
                                                <ResponsiveContainer
                                                    height={100}
                                                >
                                                    <BarChart data={data}>
                                                        <Bar
                                                            dataKey="uv"
                                                            fill="#81a4ff"
                                                            stroke="#3f6ad8"
                                                            strokeWidth={2}
                                                        />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="12" lg="6">
                                <Row>
                                    <Col md="6">
                                        <div className="card mb-3 bg-arielle-smile widget-chart text-white card-border">
                                            <div className="icon-wrapper rounded-circle">
                                                <div className="icon-wrapper-bg bg-white opacity-10" />
                                                <i className="lnr-cog icon-gradient bg-arielle-smile" />
                                            </div>
                                            <div className="widget-numbers">
                                                87,4
                                            </div>
                                            <div className="widget-subheading">
                                                Reports Generated
                                            </div>
                                            <div className="widget-description text-white">
                                                {/* <FontAwesomeIcon icon={faAngleUp}/> */}
                                                <span className="ps-1">
                                                    54.9%
                                                </span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="card mb-3 bg-midnight-bloom widget-chart text-white card-border">
                                            <div className="icon-wrapper rounded">
                                                <div className="icon-wrapper-bg bg-white opacity-10" />
                                                <i className="lnr-screen icon-gradient bg-warm-flame" />
                                            </div>
                                            <div className="widget-numbers">
                                                17.2k
                                            </div>
                                            <div className="widget-subheading">
                                                Profiles
                                            </div>
                                            <div className="widget-description text-white">
                                                <span className="pe-1">
                                                    62,7%
                                                </span>
                                                {/* <FontAwesomeIcon icon={faArrowLeft}/> */}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="card mb-3 bg-grow-early widget-chart text-white card-border">
                                            <div className="icon-wrapper rounded">
                                                <div className="icon-wrapper-bg bg-dark opacity-9" />
                                                <i className="lnr-graduation-hat text-white" />
                                            </div>
                                            <div className="widget-numbers">
                                                63.2k
                                            </div>
                                            <div className="widget-subheading">
                                                Bugs Fixed
                                            </div>
                                            <div className="widget-description text-white">
                                                {/* <FontAwesomeIcon icon={faArrowRight}/> */}
                                                <span className="ps-1">
                                                    72.1%
                                                </span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="card mb-3 bg-love-kiss widget-chart card-border">
                                            <div className="widget-chart-content text-white">
                                                <div className="icon-wrapper rounded-circle">
                                                    <div className="icon-wrapper-bg bg-white opacity-4" />
                                                    <i className="lnr-cog" />
                                                </div>
                                                <div className="widget-numbers">
                                                    45.8k
                                                </div>
                                                <div className="widget-subheading">
                                                    Total Views
                                                </div>
                                                <div className="widget-description">
                                                    {/* <FontAwesomeIcon className="text-white opacity-5" icon={faAngleUp}/> */}
                                                    <span className="text-white">
                                                        175.5%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="widget-chart-wrapper">
                                                <ResponsiveContainer
                                                    width="100%"
                                                    aspect={3.0 / 1.0}
                                                >
                                                    <LineChart
                                                        data={data}
                                                        margin={{
                                                            top: 0,
                                                            right: 5,
                                                            left: 5,
                                                            bottom: 0,
                                                        }}
                                                    >
                                                        <Line
                                                            type="monotone"
                                                            dataKey="pv"
                                                            stroke="#ffffff"
                                                            strokeWidth={3}
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="card mb-3 widget-chart">
                                    <div className="widget-chart-content">
                                        <div className="icon-wrapper rounded-circle">
                                            <div className="icon-wrapper-bg bg-warning" />
                                            <i className="lnr-heart icon-gradient bg-premium-dark">
                                                {' '}
                                            </i>
                                        </div>
                                        <div className="widget-numbers">
                                            4517.82
                                        </div>
                                        <div className="widget-subheading">
                                            Active Social Profiles
                                        </div>
                                        <div className="widget-description">
                                            Down by
                                            <span className="text-danger ps-1 pe-1">
                                                {/* <FontAwesomeIcon icon={faAngleDown}/> */}
                                                <span className="ps-1">
                                                    54.1%
                                                </span>
                                            </span>
                                            from 30 days ago
                                        </div>
                                    </div>
                                    <div className="widget-chart-wrapper chart-wrapper-relative">
                                        <ResponsiveContainer height={100}>
                                            <LineChart
                                                data={data2}
                                                margin={{
                                                    top: 0,
                                                    right: 5,
                                                    left: 5,
                                                    bottom: 0,
                                                }}
                                            >
                                                <Line
                                                    type="monotone"
                                                    dataKey="pv"
                                                    stroke="#d6b5ff"
                                                    strokeWidth={2}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="uv"
                                                    stroke="#a75fff"
                                                    strokeWidth={2}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {/* <AppFooter /> */}
                </div>
            </div>
        </>
    );
};
