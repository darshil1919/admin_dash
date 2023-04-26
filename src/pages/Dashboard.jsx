import React, { useEffect, useState, useCallback } from 'react';
import { Header } from '../components';
import { useSelector, useDispatch } from "react-redux";
import { BarChart, LineChart, PieChart, Pie, Line, Bar, Sector, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { BsCurrencyRupee } from 'react-icons/bs';
import { Button, SparkLine } from '../components';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { GrUserWorker } from 'react-icons/gr';

import { useStateContext } from '../contexts/ContextProvider';
import { getAdminDashboard } from '../store/action/dashboardAction';
// import { UPDATE_CATEGORY_RESET, DELETE_CATEGORY_RESET } from '../store/slice/categorySlice/categorySlice';
import Loader from '../components/Loader/Loader';

const Dashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  const dispatch = useDispatch();

  const { dashboard, loading: dashboardLoader } = useSelector((state) => state.dashboard);

  console.log("dashboard------>", dashboard);
  useEffect(() => {
    dispatch(getAdminDashboard());
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const renderActiveShape = (props) => {
    console.log("props------->", props);
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`workers: ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <>
      {
        dashboardLoader ?
          (
            <Loader />
          ) : (
            <div className="mt-24">
              <div className="flex flex-wrap lg:flex-nowrap justify-center ">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-400">Total Revenue</p>
                      <p className="text-2xl">₹{dashboard.earning ? dashboard.earning[0].total : null}</p>
                    </div>
                    <button
                      type="button"
                      style={{ backgroundColor: currentColor }}
                      className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                    >
                      <BsCurrencyRupee />
                    </button>
                  </div>
                  {/* <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
            />
          </div> */}
                </div>
                <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                  <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="mt-3">
                          <span className="text-lg font-semibold">{dashboard?.customer}</span>
                        </p>
                        <p className="text-sm text-gray-400  mt-1">Customers</p>
                      </div>
                      <button
                        type="button"
                        style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
                        className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                      >
                        <MdOutlineSupervisorAccount />
                      </button>
                    </div>
                  </div>
                  <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="mt-3">
                          <span className="text-lg font-semibold">{dashboard?.worker}</span>
                        </p>
                        <p className="text-sm text-gray-400  mt-1">Worker</p>
                      </div>
                      <button
                        type="button"
                        style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
                        className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                      >
                        <GrUserWorker />
                      </button>
                    </div>
                  </div>
                  <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="mt-3">
                          <span className="text-lg font-semibold">{dashboard?.order}</span>
                        </p>
                        <p className="text-sm text-gray-400  mt-1">Completed Order</p>
                      </div>
                      <button
                        type="button"
                        style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
                        className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                      >
                        <MdOutlineSupervisorAccount />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-10 flex-wrap justify-center">
                <div className="bg-white w-9/10 dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-3/5">
                  <div>
                    <div
                      className=" rounded-2xl p-4 m-3"
                      style={{ backgroundColor: currentColor }}
                    >
                      <div className="flex justify-between flex-col	flex-wrap items-center sm:flex-row">
                        <p className="font-semibold text-white text-2xl">Monthly Revenue</p>

                        <div>
                          <p className="text-white mt-6">{dashboard.monthlyEarning ? `${dashboard?.monthlyEarning[dashboard?.monthlyEarning.length - 1].month} ${dashboard?.monthlyEarning[dashboard?.monthlyEarning.length - 1].year}` : null}</p>
                          <p className="text-2xl text-white font-semibold">₹{dashboard.monthlyEarning ? dashboard?.monthlyEarning[dashboard?.monthlyEarning.length - 1].total : null}</p>
                        </div>
                      </div>

                    </div>
                    <div className="mt-4">
                      <ResponsiveContainer debounce={300} width="100%" height={300}>
                        <BarChart
                          // width={600}
                          // height={300}
                          data={dashboard.monthlyEarning ? dashboard?.monthlyEarning : null}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="total" fill='#00bdae' />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-10 flex-wrap justify-center">
                <div className="bg-white w-9/10 dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-3/5">
                  <div className=''>
                    <div
                      className=" rounded-2xl p-4 m-3"
                      style={{ backgroundColor: currentColor }}
                    >
                      <div className="flex justify-between flex-col	flex-wrap items-center sm:flex-row">
                        <p className="font-semibold text-white text-2xl">Monthly Orders</p>
                        <div>
                          <p className="text-white mt-6">{dashboard.orderStatus ? `${dashboard?.orderStatus[dashboard?.orderStatus.length - 1].month} ${dashboard?.orderStatus[dashboard?.orderStatus.length - 1].year}` : null}</p>
                          <p className="text-2xl text-white font-semibold">{dashboard.orderStatus ? dashboard?.orderStatus[dashboard?.orderStatus.length - 1].totalOrders : null}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div>
                        <ResponsiveContainer debounce={300} width="100%" height={300}>
                          <LineChart
                            // width={500}
                            // height={300}
                            data={dashboard.orderStatus ? dashboard?.orderStatus : null}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="totalOrders" stroke="#00bdae" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="cancelledOrders" stroke="#8884d8" />
                            <Line type="monotone" dataKey="completedOrders" stroke="#82ca9d" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-10 flex-wrap justify-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl">
                  <div>
                    <div
                      className=" rounded-2xl p-4 m-3"
                      style={{ backgroundColor: currentColor }}
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-white text-2xl">Category Wise Worker</p>
                      </div>

                    </div>
                    <div className="mt-4">
                      <PieChart width={500} height={300}>
                        <Pie
                          activeIndex={activeIndex}
                          activeShape={renderActiveShape}
                          data={dashboard.categoryWorker ? dashboard.categoryWorker.categories : null}
                          cx={250}
                          cy={150}
                          innerRadius={70}
                          outerRadius={85}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          onMouseEnter={onPieEnter}
                        />
                      </PieChart>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
        <div>
          <p className="text-2xl font-semibold ">$43,246</p>
          <p className="text-gray-400">Yearly sales</p>
        </div>

        <div className="w-40">
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={dashboard.categoryWorker ? dashboard.categoryWorker.categories : null}
              cx={200}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </div>
      </div> */}
            </div>
          )
      }
    </>
  );
};
export default Dashboard;
