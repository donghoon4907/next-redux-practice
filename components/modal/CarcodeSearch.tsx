import type { ChangeEvent, FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { CarState } from '@reducers/car';
import type { RequestCarcodeType } from '@models/car';
import type { CoreSelectOption, CoreSetState } from '@interfaces/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { differenceInCalendarDays } from 'date-fns';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { hideGetCarcodeModal } from '@actions/modal/get-carcode.action';
import { MyRadio } from '@components/radio';
import { useApi } from '@hooks/use-api';
import {
    clearCarcode,
    getCarcodeRequest,
} from '@actions/car/get-carcode.action';
import { MyMultipleAccordion } from '@components/accordion';
import { isEmpty } from '@utils/validator/common';
import { findSelectOption } from '@utils/getter';
import carConstants from '@constants/options/car';

interface Props {
    /**
     * 차명코드 변경 핸들러
     */
    setExternalCarcode: CoreSetState<string>;
    /**
     * 차량연식 변경 핸들러
     */
    setExternalCaryear: CoreSetState<CoreSelectOption | null>;
    /**
     * 차량명 변경 핸들러
     */
    setExternalCarname: CoreSetState<string>;
}

export const CarcodeSearchModal: FC<Props> = ({
    setExternalCarcode,
    setExternalCaryear,
    setExternalCarname,
}) => {
    const dispatch = useDispatch();

    const { carCompanies, companyCars, carYears, carSeries, carOptions } =
        useSelector<AppState, CarState>((state) => state.car);

    const { isShowCarSearchModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const getCarcode = useApi(getCarcodeRequest);
    // 가입예정일
    const [idate, setIdate] = useState('');
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

    const handleClickMenu = (menu: string) => {
        if (menu !== activeMenu) {
            setActiveMenu(menu);
        }
    };

    const handleClear = (type: RequestCarcodeType) => {
        if (type === 'companies') {
            setCarname('');
            setCaryear('');
            setCarsub('');
            setCarcode('');
            setCarpart('');
        } else if (type === 'company-cars') {
            setCaryear('');
            setCarsub('');
            setCarcode('');
            setCarpart('');
        } else if (type === 'car-years') {
            setCarsub('');
            setCarcode('');
            setCarpart('');
        } else if (type === 'car-series') {
            setCarcode('');
            setCarpart('');
        }

        dispatch(clearCarcode({ type }));
    };

    const handleChangeCarbrand = (evt: ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = evt.target;
        if (checked) {
            setCarbrand(value);

            handleClear('companies');

            getCarcode(
                {
                    type: 'company-cars',
                    idate,
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

            handleClear('company-cars');

            getCarcode(
                {
                    type: 'car-years',
                    idate,
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

            handleClear('car-years');

            getCarcode(
                {
                    type: 'car-series',
                    idate,
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
            handleClear('car-series');

            getCarcode(
                {
                    type: 'car-options',
                    idate,
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
        dispatch(hideGetCarcodeModal());
    };

    const handleSubmit = () => {
        if (isEmpty(carbrand)) {
            return alert('제조사를 선택해주세요.');
        }

        if (isEmpty(carname)) {
            return alert('자동차명을 선택해주세요.');
        }

        if (isEmpty(caryear)) {
            return alert('자동차 등록년도를 선택해주세요.');
        }

        if (isEmpty(carsub)) {
            return alert('세부차명을 선택해주세요.');
        }

        if (isEmpty(carcode)) {
            return alert('세부항목을 선택해주세요.');
        }

        const tf = confirm('선택한 정보로 입력하시겠습니까?');

        if (tf) {
            setExternalCarcode(carcode);

            setExternalCaryear(findSelectOption(caryear, carConstants.year));

            setExternalCarname(carsub);

            handleClose();
        }
    };

    const handleOpened = () => {
        const { value } = document.querySelector('#idate') as HTMLInputElement;

        if (isEmpty(value)) {
            handleClose();

            return alert('가입예정일이 입력되어야 합니다.');
        }

        setIdate(value);

        // 이전에 요청한 정보가 아닌 경우만 호출
        const current = new Date(value);
        const prev = new Date(carCompanies.idate);
        if (differenceInCalendarDays(current, prev) !== 0) {
            getCarcode({
                type: 'companies',
                idate: value,
            });
        }
    };

    return (
        <Modal
            isOpen={isShowCarSearchModal}
            toggle={handleClose}
            size="xl"
            onOpened={handleOpened}
        >
            <ModalHeader toggle={handleClose}>차량코드 조회</ModalHeader>
            <ModalBody>
                <div className="row wr-pages-compare-car-search">
                    <div className="col-6">
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
                                {carCompanies.data.map((v, i) => (
                                    <li
                                        key={`carCompanies${i}`}
                                        className="wr-pages-compare-car-search-accordion__item"
                                    >
                                        <MyRadio
                                            id={`carCompanies${i}`}
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
                                {companyCars.length === 0 && (
                                    <li className="wr-pages-compare-car-search-accordion__item">
                                        상위 옵션을 선택해주세요.
                                    </li>
                                )}
                                {companyCars.map((v, i) => (
                                    <li
                                        key={`companyCars${i}`}
                                        className="wr-pages-compare-car-search-accordion__item"
                                    >
                                        <MyRadio
                                            id={`companyCars${i}`}
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
                                {carYears.length === 0 && (
                                    <li className="wr-pages-compare-car-search-accordion__item">
                                        상위 옵션을 선택해주세요.
                                    </li>
                                )}
                                {carYears.map((v, i) => (
                                    <li
                                        key={`carYears${i}`}
                                        className="wr-pages-compare-car-search-accordion__item"
                                    >
                                        <MyRadio
                                            id={`carYears${i}`}
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
                                {carSeries.length === 0 && (
                                    <li className="wr-pages-compare-car-search-accordion__item">
                                        상위 옵션을 선택해주세요.
                                    </li>
                                )}
                                {carSeries.map((v, i) => (
                                    <li
                                        key={`carSeries${i}`}
                                        className="wr-pages-compare-car-search-accordion__item"
                                    >
                                        <MyRadio
                                            id={`carSeries${i}`}
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
                                {carOptions.length === 0 && (
                                    <li className="wr-pages-compare-car-search-accordion__item">
                                        상위 옵션을 선택해주세요.
                                    </li>
                                )}
                                {carOptions.map((v, i) => (
                                    <li
                                        key={`carOptions${i}`}
                                        className="wr-pages-compare-car-search-accordion__item"
                                    >
                                        <MyRadio
                                            id={`carOptions${i}`}
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
                            <div className="wr-table--normal">
                                <table className="wr-table table">
                                    <colgroup>
                                        <col width="100px" />
                                        <col />
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong className="wr-label--required">
                                                    제조사
                                                </strong>
                                            </td>
                                            <td>
                                                <span>{carbrand}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong className="wr-label--required">
                                                    자동차명
                                                </strong>
                                            </td>
                                            <td>
                                                <span>{carname}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong className="wr-label--required">
                                                    등록년도
                                                </strong>
                                            </td>
                                            <td>
                                                <span>{caryear}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong className="wr-label--required">
                                                    세부차명
                                                </strong>
                                            </td>
                                            <td>
                                                <span>{carsub}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong className="wr-label--required">
                                                    세부항목
                                                </strong>
                                            </td>
                                            <td>
                                                <span>{carpart}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button type="button" color="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button type="button" color="primary" onClick={handleSubmit}>
                    적용
                </Button>
            </ModalFooter>
        </Modal>
    );
};
