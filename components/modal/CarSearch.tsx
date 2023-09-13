import type { ChangeEvent, FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { CarState } from '@reducers/car';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuarter } from 'date-fns';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { hideCarSearchModal } from '@actions/modal/car-search.action';
import { MyRadio } from '@components/radio';
import { useApi } from '@hooks/use-api';
import { getCarCompaniesRequest } from '@actions/contract/car/get-car-companies.action';
import { MyMultipleAccordion } from '@components/accordion';

interface Props {
    idate: Date;
}

export const CarSearchModal: FC<Props> = ({ idate }) => {
    const dispatch = useDispatch();

    const { carCompanies, companyCars, carYears, carSeries, carOptions } =
        useSelector<AppState, CarState>((state) => state.car);

    const { isShowCarSearchModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const getCarInfo = useApi(getCarCompaniesRequest);
    // 아코디언 comp, carname
    const [activeMenu, setActiveMenu] = useState('carbrand');
    // 제조사
    const [carbrand, setCarbrand] = useState('');
    // 자동차명
    const [carname, setCarname] = useState('');
    // 등록년도
    const [caryear, setCaryear] = useState('');
    // 세부차명
    const [carsub, setCarsub] = useState('');
    // 차명코드
    const [carcode, setCarcode] = useState('');
    // 세부항목
    const [carpart, setCarpart] = useState('');
    // 보험개시년도
    const year = idate.getFullYear();
    // 보험개시분기
    const quater = getQuarter(idate) + '분기';

    const handleClickMenu = (menu: string) => {
        if (menu !== activeMenu) {
            setActiveMenu(menu);
        }
    };

    const handleChangeCarbrand = (evt: ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = evt.target;
        if (checked) {
            setCarbrand(value);
            setCarname('');
            setCaryear('');
            setCarsub('');
            setCarcode('');
            setCarpart('');

            getCarInfo(
                {
                    type: 'company-cars',
                    year,
                    quater,
                    params: {
                        carbrand: value,
                    },
                },
                () => {
                    setActiveMenu('carname');
                },
            );
        }
    };

    const handleChangeCarname = (evt: ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = evt.target;
        if (checked) {
            setCarname(value);
            setCaryear('');
            setCarsub('');
            setCarcode('');
            setCarpart('');

            getCarInfo(
                {
                    type: 'car-years',
                    year,
                    quater,
                    params: {
                        carbrand,
                        carname: value,
                    },
                },
                () => {
                    setActiveMenu('caryear');
                },
            );
        }
    };

    const handleChangeCaryear = (evt: ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = evt.target;
        if (checked) {
            setCaryear(value);
            setCarsub('');
            setCarcode('');
            setCarpart('');

            getCarInfo(
                {
                    type: 'car-series',
                    year,
                    quater,
                    params: {
                        carbrand,
                        carname,
                        caryear: value,
                    },
                },
                () => {
                    setActiveMenu('carsub');
                },
            );
        }
    };

    const handleChangeCarsub = (evt: ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = evt.target;
        if (checked) {
            setCarsub(value);
            setCarcode('');
            setCarpart('');

            getCarInfo(
                {
                    type: 'car-options',
                    year,
                    quater,
                    params: {
                        carbrand,
                        carname,
                        caryear,
                        carsub: value,
                    },
                },
                () => {
                    setActiveMenu('carpart');
                },
            );
        }
    };

    const handleChangeCarpart = (
        evt: ChangeEvent<HTMLInputElement>,
        carcode: string,
    ) => {
        const { checked, value } = evt.target;
        if (checked) {
            setCarpart(value);
            setCarcode(carcode);
        }
    };

    const handleClose = () => {
        dispatch(hideCarSearchModal());
    };

    const handleSubmit = () => {};

    const createPayload = () => {
        // const payload: CreateCodePayload = {
        //     index: generateIndex(codes),
        //     wcode: +comp.value!.value,
        //     fccode: code.value,
        //     password: password.value,
        //     cent_val: centVal.value,
        //     indate: indate.value
        //         ? dayjs(indate.value).format('YYYY-MM-DD')
        //         : null,
        //     dist: comp.value!.origin.dist,
        //     company: comp.value!.label,
        //     checked: false,
        // };
        // return payload;
    };

    useEffect(() => {
        const _year = idate.getFullYear();

        const _quarter = getQuarter(idate);

        getCarInfo({
            type: 'companies',
            year: _year,
            quater: `${_quarter}분기`,
        });
    }, [idate]);

    return (
        <Modal isOpen={isShowCarSearchModal} toggle={handleClose} size="xl">
            <ModalHeader toggle={handleClose}>차량코드 조회</ModalHeader>
            <ModalBody>
                <div className="row wr-pages-compare-car-search">
                    <div className="col-8">
                        <MyMultipleAccordion
                            headerText={
                                carbrand
                                    ? `제조사: ${carbrand}`
                                    : '제조사를 선택하세요.'
                            }
                            collapse={activeMenu === 'carbrand'}
                            onClickHeader={() => handleClickMenu('carbrand')}
                        >
                            <ul className="wr-pages-compare-car-search-accordion__body">
                                {carCompanies.map((v, i) => (
                                    <li
                                        key={`carCompanies${i}`}
                                        className="wr-pages-compare-car-search-accordion__item"
                                    >
                                        <MyRadio
                                            label={v.carbrand}
                                            name="carbrand"
                                            value={v.carbrand}
                                            onChange={handleChangeCarbrand}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </MyMultipleAccordion>
                        <MyMultipleAccordion
                            headerText={
                                carname
                                    ? `자동차명: ${carname}`
                                    : '자동차명을 선택하세요.'
                            }
                            collapse={activeMenu === 'carname'}
                            onClickHeader={() => handleClickMenu('carname')}
                        >
                            <ul className="wr-pages-compare-car-search-accordion__body">
                                {companyCars.map((v, i) => (
                                    <li
                                        key={`companyCars${i}`}
                                        className="wr-pages-compare-car-search-accordion__item"
                                    >
                                        <MyRadio
                                            label={v.carname}
                                            name="carname"
                                            value={v.carname}
                                            onChange={handleChangeCarname}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </MyMultipleAccordion>
                        <MyMultipleAccordion
                            headerText={
                                caryear
                                    ? `자동차 등록년도: ${caryear}`
                                    : '자동차 등록년도를 선택하세요.'
                            }
                            collapse={activeMenu === 'caryear'}
                            onClickHeader={() => handleClickMenu('caryear')}
                        >
                            <ul className="wr-pages-compare-car-search-accordion__body">
                                {carYears.map((v, i) => (
                                    <li
                                        key={`carYears${i}`}
                                        className="wr-pages-compare-car-search-accordion__item"
                                    >
                                        <MyRadio
                                            label={v.caryear}
                                            name="caryear"
                                            value={v.caryear}
                                            onChange={handleChangeCaryear}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </MyMultipleAccordion>
                        <MyMultipleAccordion
                            headerText={
                                carsub
                                    ? `세부차명: ${carsub}`
                                    : '세부차명을 선택하세요.'
                            }
                            collapse={activeMenu === 'carsub'}
                            onClickHeader={() => handleClickMenu('carsub')}
                        >
                            <ul className="wr-pages-compare-car-search-accordion__body">
                                {carSeries.map((v, i) => (
                                    <li
                                        key={`carSeries${i}`}
                                        className="wr-pages-compare-car-search-accordion__item"
                                    >
                                        <MyRadio
                                            label={v.carsub}
                                            name="carsub"
                                            value={v.carsub}
                                            onChange={handleChangeCarsub}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </MyMultipleAccordion>
                        <MyMultipleAccordion
                            headerText={
                                carpart
                                    ? `세부항목: ${carpart}`
                                    : '세부항목을 선택하세요.'
                            }
                            collapse={activeMenu === 'carpart'}
                            onClickHeader={() => handleClickMenu('carpart')}
                        >
                            <ul className="wr-pages-compare-car-search-accordion__body">
                                {carOptions.map((v, i) => (
                                    <li
                                        key={`carOptions${i}`}
                                        className="wr-pages-compare-car-search-accordion__item"
                                    >
                                        <MyRadio
                                            label={v.carpart}
                                            name="carpart"
                                            value={v.carpart}
                                            onChange={(evt) =>
                                                handleChangeCarpart(
                                                    evt,
                                                    v.carcode,
                                                )
                                            }
                                        />
                                    </li>
                                ))}
                            </ul>
                        </MyMultipleAccordion>
                    </div>
                    <div className="col">
                        <div className="wr-pages-compare-car-search-description">
                            <div className="row">
                                <div className="col-3">제조사</div>
                                <div className="col">{carbrand}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">자동차명</div>
                                <div className="col">{carname}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">등록년도</div>
                                <div className="col">{caryear}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">세부차명</div>
                                <div className="col">{carsub}</div>
                            </div>
                            <div className="row">
                                <div className="col-3">세부항목</div>
                                <div className="col">{carpart}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    적용
                </Button>
            </ModalFooter>
        </Modal>
    );
};
