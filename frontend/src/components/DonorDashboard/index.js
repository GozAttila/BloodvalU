import React, {useEffect, useState} from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import NumberFormat from "react-number-format";
import {PageContainer} from "../../style/GlobalWrappers";
import {BigInput} from "../../style/GlobalInputs";
import {DarkBlueButton} from "../../style/GlobalButtons";
import {SmallTitle} from "../../style/GlobalTitles";
import GenericDonorTestCard from "../GenericDonorTestCard";
import GenericDonorRequestBar from "../GenericDonorRequestBar";
import {connect} from "react-redux";
import DonorProfileCardWide from "../GenericDonorProfileWide";
import {
    getAllAppliedToRequestsAction,
    getAllRequestsAction,
} from "../../store/actions/bloodRequestActions";
import {searchAllRequestsAndTestsAction} from "../../store/actions/searchActions";
import {getLoggedInUserAction} from "../../store/actions/userActions";
import {bloodGroupTest} from "../../HelperFunctions";
import Spinner from "../../components/GenericSpinner";

const ColorDebug = false; //at true all element get colored background for checking

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${ColorDebug ? "darkorange" : ""};
`;

const LeftSide = styled.div`
  height: 100%;
  width: calc(100% - 544px);
  //width: 40%;
  min-width: 576px;
  padding-top: ${rem("36px")};
  padding-left: ${rem("160px")};
  background-color: ${ColorDebug ? "burlywood" : ""};
`;

const RightSide = styled.div`
    width: ${rem("544px")};
    //height: ${rem("628px")};
    height: 100%;
    background-color: ${ColorDebug ? "cornflowerblue" : ""};
`;

const MenuContainer = styled.div`
    //width: ${rem("445px")};
    width: 100%;
    height: ${rem("48px")};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: ${rem("24px")};
    background-color: ${ColorDebug ? "darkkhaki" : ""};
`;

const MiddleButton = styled.button`
  height: 100%;
  position: relative;
  width: 34%;
  background-color: #ffffff;
  font-weight: 500;
  font-size: ${rem("14px")};
  color: ${(props) => (props.active ? "#121213" : "#A1A4B1")};
  border: none;
  border-top: 2px solid #ffffff;
  text-transform: capitalize;

  :hover {
    color: #121213;
  }

  ::after {
    position: absolute;
    bottom: 0;
    content: "";
    display: block;
    width: ${(props) => (props.active ? "100%" : "0")};
    height: 2px;
    background: #121213;
    transition: width 0.3s;
  }

  :focus::after {
    color: #121213;
    width: 100%;
    transition: width 0.3s;
  }
`;

const SideButton = styled(MiddleButton)`
  width: 33%;
`;

const DashboardContentContainer = styled.div`
    //width: ${rem("445px")};
    width: 70%;   
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    background-color: ${ColorDebug ? "deepskyblue" : ""};
`;

const SearchContainer = styled.div`
    //width: ${rem("445px")};
    width: 100%;
    height: ${rem("40px")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${rem("32px")};
    background-color: ${ColorDebug ? "darksalmon" : ""};
`;

const SearchInput = styled(BigInput)`
    //width: ${rem("326px")};
    width: 80%;
    height: ${rem("40px")};
`;

const SearchButton = styled(DarkBlueButton)`
  width: ${rem("96px")};
  height: ${rem("40px")};
`;

const PointsHeader = styled.div`
    //width: ${rem("445px")};
    width: 100%;
    height: ${rem("48px")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    //margin-bottom: ${rem("16px")};
    //min-width should be 432px because of the texts
    background-color: ${ColorDebug ? "lightgreen" : ""};
`;
const PointsText = styled.div`
  font-size: ${rem("24px")};
  font-weight: 600;
  color: #43a047;
  margin-right: ${rem("8px")};
`;
const OfferTitle = styled(SmallTitle)`
  font-size: ${rem("24px")};
  font-weight: 600;
  margin-left: ${rem("8px")};
  letter-spacing: 1.5px;
`;

const UnderLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #a1a4b1;
  border: 1px solid #a1a4b1;
  margin-bottom: ${rem("16px")};
`;

const OfferContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: ${ColorDebug ? "greenyellow" : ""};
`;

const RequestContainer = styled.div`
  width: 100%;
  background-color: ${ColorDebug ? "lightslategrey" : ""};
`;

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DonorDashboard = ({
                            dispatch,
                            userProfileReducer: {offeredTests, requests, appliedRequests},
                            authReducer: {userObj},
                        }) => {
    // const [active, setActive] = useState("requests");
    const [active, setActive] = useState("requests");
    const handleClick = (e) => {
        const value = e.target.id;
        dispatch(searchAllRequestsAndTestsAction("", `${value}`));
        setActive(value);
    };

    const [searchParams, setSearchParams] = useState("");
    // console.log('searchParams', searchParams);
    // console.log('active', active);
    console.log("requests", requests);
    console.log("userObj", userObj);
    console.log("offeredTests", offeredTests);

    const handleSearch = (event) => {
        dispatch(searchAllRequestsAndTestsAction(searchParams, active));
        setSearchParams("");
    };

    const handleSearchInput = (e) => {
        const value = e.currentTarget.value;
        setSearchParams(value);
    };

    useEffect(() => {
        // get Requests
        dispatch(getAllRequestsAction()); // This gets all requests
        dispatch(searchAllRequestsAndTestsAction("", "tests")); //This gets all offered tests
        dispatch(getLoggedInUserAction());
    }, [dispatch]);

    return (
        <PageContainer>
            <PageWrapper>
                <LeftSide>
                    <DashboardContentContainer>
                        <MenuContainer>
                            <SideButton id="requests" onClick={handleClick} active={active === "requests"}>
                                All requests
                            </SideButton>
                            <MiddleButton id="applied" onClick={handleClick} active={active === "applied"}>
                                Applied
                            </MiddleButton>
                            <SideButton id="tests" onClick={handleClick} active={active === "tests"}>
                                Points menu
                            </SideButton>
                        </MenuContainer>

                        <SearchContainer>
                            <SearchInput onChange={handleSearchInput} placeholder="Search..."/>{" "}
                            {/*TODO add search on enter*/}
                            <SearchButton onClick={handleSearch}>Search</SearchButton>
                        </SearchContainer>

                        {active === "tests" ? (
                            <>
                                <PointsHeader>
                                    <OfferTitle>Offers</OfferTitle>
                                    <NumberFormat
                                        isNumericString={true}
                                        renderText={(value) => <PointsText>Your total points: {value} pts</PointsText>}
                                        value={userObj ? userObj.total_points : 0}
                                        displayType={"text"}
                                        thousandSeparator={" "}
                                    />
                                </PointsHeader>

                                <UnderLine/>

                                <OfferContainer>
                                    {offeredTests
                                        ? offeredTests.map((test, index) => {
                                            return <GenericDonorTestCard key={index} test={test}/>;
                                        })
                                        : null}
                                </OfferContainer>
                            </>
                        ) : active === "requests" ? (
                            <RequestContainer>
                                {requests ? (
                                    requests.map((request, index) => {
                                        if (userObj && bloodGroupTest(userObj.blood_group, request))
                                            return <GenericDonorRequestBar key={index} request={request}/>;
                                    })
                                ) : (
                                    <SpinnerContainer>
                                        <Spinner/>
                                    </SpinnerContainer>
                                )}
                            </RequestContainer>
                        ) : (
                            <div>
                                {requests ? (
                                    requests.map((request, index) => {
                                        return <GenericDonorRequestBar key={index} request={request}/>;
                                    })
                                ) : (
                                    <SpinnerContainer>
                                        <Spinner/>
                                    </SpinnerContainer>
                                )}
                            </div>
                        )}
                    </DashboardContentContainer>
                </LeftSide>

                <RightSide>{userObj ? <DonorProfileCardWide userObj={userObj}/> : null}</RightSide>
            </PageWrapper>
        </PageContainer>
    );
};

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        userProfileReducer: state.userProfileReducer,
        authReducer: state.authReducer,
    };
};

export default connect(mapStateToProps)(DonorDashboard);
