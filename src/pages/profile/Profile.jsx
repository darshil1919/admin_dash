import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from '../../components';
import styles from "./profile.module.css";
import AccordionStyles from "./Accordion.module.css";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IconContext } from "react-icons";


const Profile = () => {
	const dispatch = useDispatch();

	useEffect(() => {

	}, []);

	const [clicked, setClicked] = useState(false);

	const toggle = (index) => {
		if (clicked === index) {
			//if clicked question is already active, then close it
			return setClicked(null);
		}
		setClicked(index);
	};


	return (
		<>
			{false ?
				(
					<Loader />

				) : (
					<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
						<Header category="Page" title="Profile" />
						<section className=''>
							<div className=''>

								<div className={AccordionStyles.Accordion_FAQs}>
									<div
										className={AccordionStyles.Wrap}
										onClick={() => toggle(0)}
									>
										<div className={AccordionStyles.Question}>
											<h5>Edit your account details</h5>
											<span>{clicked === 0 ? <FiMinus /> : <FiPlus />}</span>
										</div>
									</div>

									{clicked === 0 ? (
										<div className={AccordionStyles.Dropdown}>

											{/* <div className={styles.title}>Edit your account details</div> */}
											<div className={styles.content}>
												<form>
													<div className={styles["user-details"]}>
														<div className={styles["input-box"]}>
															<span className={styles.details}>First Name</span>
															<input
																type="text"
																name="fullName"
																placeholder="john Dear"

																required
															/>
														</div>
														<div className={styles["input-box"]}>
															<span className={styles.details}>Last Name</span>
															<input
																type="text"
																name="phoneNumber"
																placeholder="Enter your phone number"

																required
															/>
														</div>
														<div className={styles["input-box"]}>
															<span className={styles.details}>Email</span>
															<input
																type="email"
																name="email"
																placeholder="Enter your email"

																required
															/>
														</div>
														<div className={styles["input-box"]}>
															<span className={styles.details}>Phone Number</span>
															<input
																name="serviceDate"
																type="number"
																placeholder="Enter your phone Number"

																required
															/>
														</div>
													</div>
													<div className="text-center">
														<button className={styles.submit_btn}>Update</button>
													</div>
												</form>
											</div>

										</div>
									) : null}
								</div>

								<div className={AccordionStyles.Accordion_FAQs}>
									<div
										className={AccordionStyles.Wrap}
										onClick={() => toggle(1)}
									>
										<div className={AccordionStyles.Question}>
											<h5>Change your password</h5>
											<span>{clicked === 1 ? <FiMinus /> : <FiPlus />}</span>
										</div>
									</div>

									{clicked === 1 ? (
										<div className={AccordionStyles.Dropdown}>

											<div className={styles.content}>
												<form>
													<div className={styles["user-details"]}>
														<div className={styles["input-box2"]}>
															<span className={styles.details}>Old Password</span>
															<input
																type="text"
																name="fullName"
																placeholder="john Dear"

																required
															/>
														</div>
														<div className={styles["input-box2"]}>
															<span className={styles.details}>New Password</span>
															<input
																type="text"
																name="phoneNumber"
																placeholder="Enter your phone number"

																required
															/>
														</div>
														<div className={styles["input-box2"]}>
															<span className={styles.details}>Confirm Password</span>
															<input
																type="text"
																name="text"
																placeholder="Enter your email"

																required
															/>
														</div>
													</div>
													<div className="text-center">
														<button className={styles.submit_btn}>Update</button>
													</div>
												</form>
											</div>

										</div>
									) : null}
								</div>

							</div>
						</section>
					</div>
				)}
		</>
	);
};

export default Profile;
