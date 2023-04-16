import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import Lodder from '../components/Loader/Loader';
import { useDispatch, useSelector } from "react-redux";
import * as moment from "moment";
import OtpInput from "react-otp-input";
import {
  deleteOrder,
  getSingleOrder,
  updateOrder,
  updateOrderAssignWorker,
} from "../store/action/orderAction";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';


// import Loading from '../components/small/Loading';

const ViewOrder = () => {

  const { id: viewId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setotp] = useState("");
  const [error, setError] = useState('');

  const { orderDetail, loading: orderDetailLoading } = useSelector((state) => {
    return state.orderDetails;
  });

  const { order, loading: orderLoading } = useSelector((state) => {
    return state.order;
  });

  console.log("orderDetail------------>", orderDetail);

  const getSingle = async () => {
    setTimeout(
      function () {
        if (viewId) {
          let payload = {
            id: viewId,
          };
          dispatch(getSingleOrder(payload));
        }
      }, 1000);
  }
  useEffect(() => {
    if (viewId) {
      let payload = {
        id: viewId,
      };
      dispatch(getSingleOrder(payload));
    }
    // dispatch(getSubCategory());
  }, [dispatch, viewId]);

  let start = moment(orderDetail?.startTime).format("ddd DD MMM YY LT");
  let end = moment(orderDetail?.endTime).format("ddd DD MMM YY LT");

  const handleChange = (otpValue) => {
    const numericValue = otpValue.replace(/[^0-9]/g, '');
    setotp(numericValue);
    setError('');
  };

  const cancleOrder = () => {
    let payload = {
      status: 'cancelled',
    };
    dispatch(deleteOrder(viewId, payload));
  };

  let working = orderDetail?.startServiceCode && !orderDetail?.endServiceCode;

  const handleSubmit = () => {
    // Check if all input values are numbers before submitting
    const isNumeric = /^[0-9]+$/.test(otp);
    if (otp.length === 4 && isNumeric) {
      if (orderDetail?.startServiceCode && !orderDetail?.endServiceCode) {
        // return
        let payload = {
          status: 'working',
          startServiceCode: otp,
          workerId: orderDetail?.workerId,
          // orderId: orderDetail?._id,
        }
        dispatch(updateOrder(orderDetail?._id, payload));
        getSingle();
        setotp("");
      } else if (orderDetail?.startServiceCode && orderDetail?.endServiceCode) {

        let payload = {
          status: 'completed',
          endServiceCode: otp,
          workerId: orderDetail?.workerId,
        }
        dispatch(updateOrder(orderDetail?._id, payload));
        getSingle();
        setotp("");
      }

    } else {
      setError('Invalid otp');
    }
  };

  const assignWorker = (workerId) => {
    console.log("workerId--------->", workerId);
    let payload = {
      status: 'confirmed',
      workerId: workerId,
    }
    dispatch(updateOrderAssignWorker(viewId, payload));
  };

  const currentTime = new Date();
  const tenMinutesAgo = new Date(currentTime.getTime() + 10 * 60 * 1000);
  let showOtp = new Date(orderDetail?.startTime) < tenMinutesAgo;

  return (
    <>
      {
        orderLoading || orderDetailLoading ? (
          // <div>loading</div>
          <Lodder />
        ) :
          (<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <div className="py-3 px-2 flex justify-center align-middle">
              <h2 className="font-bold text-2xl">View Order</h2>
            </div>

            <div className="py-3 px-2 flex justify-center align-middle">
              <h2 className="font-bold text-2xl">{orderDetail?.status}</h2>
            </div>

            <div className="">
              <div className="font-semibold text-lg capitalize pb-2.5 text-center">
                {orderDetail?.categoryDetail?.categoryName}
              </div>

              <div className="flex">
                <div className="p-3 w-full">
                  <div className="inline-block w-full shadow-md rounded-lg overflow-hidden">
                    <table className="w-full text-center leading-normal">
                      <thead className="">
                        <tr className="p-2">
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">No.</th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">Image</th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">Service</th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">quantity</th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          orderDetail?.items?.map((data, index) => (
                            <tr key={index}>
                              <td className="p-2.5 border-b border-gray-200 bg-white text-sm">{index + 1}</td>
                              <td className="p-2.5 border-b border-gray-200 bg-white text-sm"><img className="h-16 w-20 mx-auto" src={`http://localhost:4000/image/serviceImages/${data?.image}`} alt="service Image" /></td>
                              <td className="p-2.5 border-b border-gray-200 bg-white text-sm">{data?.image}</td>
                              <td className="p-2.5 border-b border-gray-200 bg-white text-sm">{data?.quantity}</td>
                              <td className="p-2.5 border-b border-gray-200 bg-white text-sm">{data?.quantity * data?.price}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* <div className="basis-5/5 p-3 md:basis-2/5">
                  <div>
                    <div className="font-semibold text-lg capitalize pb-2.5 text-center">
                      work detail
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">Address: </span><span>{`${orderDetail?.serviceLocation?.address}, ${orderDetail?.serviceLocation?.city}, ${orderDetail?.serviceLocation?.state}, ${orderDetail?.serviceLocation?.pinCode}`}</span>
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">start time: </span><span>{start
                      }</span>
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">end time: </span><span>{end}</span>
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">contact No.: </span><span>{orderDetail?.grandTotal}</span>
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">grand total: </span><span>₹{orderDetail?.grandTotal}</span>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="basis-1/1 p-3 md:basis-1/2">
                  <div>
                    <div className="font-semibold text-lg capitalize pb-2.5 text-center">
                      work detail
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">Address: </span><span>{`${orderDetail?.serviceLocation?.address}, ${orderDetail?.serviceLocation?.city}, ${orderDetail?.serviceLocation?.state}, ${orderDetail?.serviceLocation?.pinCode}`}</span>
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">start time: </span><span>{start
                      }</span>
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">end time: </span><span>{end}</span>
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">contact No.: </span><span>{orderDetail?.grandTotal}</span>
                    </div>
                    <div className="pb-2">
                      <span className="font-semibold capitalize">grand total: </span><span>₹{orderDetail?.grandTotal}</span>
                    </div>
                  </div>
                </div>
                <div className="basis-1/1 p-3 md:basis-1/2">
                  {orderDetail?.workerId && orderDetail?.workerDetail &&
                    <div>
                      <div className="font-semibold text-lg capitalize pb-2.5 text-center">
                        worker detail
                      </div>
                      <div className="pb-2 flex items-center justify-start">
                        <span className="font-semibold capitalize">Avatar: </span><img className="rounded-full h-16 w-16 ml-5" src={`http://localhost:4000/image/workerImages/${orderDetail?.workerDetail?.avatar}`} alt="service Image" />
                      </div>
                      <div className="pb-2">
                        <span className="font-semibold capitalize">Name: </span><span>{`${orderDetail?.workerDetail?.firstName} ${orderDetail?.workerDetail?.lastName}`}</span>
                      </div>
                      <div className="pb-2">
                        <span className="font-semibold capitalize">Address: </span><span>{`${orderDetail?.workerDetail?.address?.houseNo} ${orderDetail?.workerDetail?.address?.streetName}, ${orderDetail?.workerDetail?.address?.landMark}, ${orderDetail?.workerDetail?.address?.city}, ${orderDetail?.workerDetail?.address?.pinCode}`}</span>
                      </div>
                      <div className="pb-2">
                        <span className="font-semibold capitalize">Contact No: </span><span>{orderDetail?.workerDetail?.phone}</span>
                      </div>
                    </div>}
                </div>
              </div>

              {orderDetail?.availableWorker &&
                <div className="flex">
                  <div className="p-3 w-full">
                    <div className="inline-block w-full shadow-md rounded-lg overflow-hidden">
                      <table className="w-full text-center leading-normal">
                        <thead className="">
                          <tr className="p-2">
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">No.</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">Image</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">Gender</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            orderDetail?.availableWorker?.map((data, index) => (
                              <tr key={index}>
                                <td className="p-2.5 border-b border-gray-200 bg-white text-sm">{index + 1}</td>
                                <td className="p-2.5 border-b border-gray-200 bg-white text-sm"><img className="h-16 w-20 mx-auto" src={`http://localhost:4000/image/workerImages/${data?.avatar}`} alt="service Image" /></td>
                                <td className="p-2.5 border-b border-gray-200 bg-white text-sm">{`${data?.firstName} ${data?.lastName}`}</td>
                                <td className="p-2.5 border-b border-gray-200 bg-white text-sm">{data?.gender}</td>
                                <td className="p-2.5 border-b border-gray-200 bg-white text-sm">
                                  <Button variant="contained" className='p-2' onClick={() => assignWorker(data?._id)}>Assign</Button>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>}

              {/* showOtp && */orderDetail.workerId && orderDetail?.workerDetail && orderDetail?.status != 'completed' && orderDetail?.status != 'cancelled' &&
                <div className="flex justify-center">
                  <div className="flex flex-col shadow-md rounded-lg p-10 border items-center">
                    <h2 className="p-2 font-semibold">{working ? 'Enter Start Work Code' : 'Enter End Work Code'}</h2>
                    <div className="p-2">
                      <OtpInput
                        value={otp}
                        onChange={handleChange}
                        numInputs={4}
                        renderSeparator={<span className="px-1.5"></span>}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{
                          border: "2px solid #0006",
                          borderRadius: "8px",
                          width: "50px",
                          height: "50px",
                          fontSize: "20px",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button variant="contained" className='p-2' onClick={handleSubmit}>{working ? 'start work' : 'complete work'}</Button>
                  </div>
                </div>
              }

              {(orderDetail?.status == "confirmed" || orderDetail?.status == "pending") &&
                <div className="text-center py-5">
                  <Button variant="contained" color="error" className='p-2' onClick={cancleOrder} >Cancle Order</Button>
                </div>
              }
            </div>
          </div>
          )
      }

    </>
  );
};

export default ViewOrder;
