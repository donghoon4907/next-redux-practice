import {
    getPostsRequest,
    getPostsSuccess,
} from '@actions/board/get-posts.action';
import { MyLayout } from '@components/Layout';
import { WithLabel } from '@components/WithLabel';
import { MyButton } from '@components/button';
import { MyFooter } from '@components/footer';
import { SearchInput } from '@components/input/Search';
import { MyPagination } from '@components/pagination';
import { MySelect } from '@components/select';
import { MyTable } from '@components/table';
import { useColumn } from '@hooks/use-column';
import { useLinkTab } from '@hooks/use-tab';
import { BoardState } from '@reducers/board';
import { AppState } from '@reducers/index';
import { wrapper } from '@store/redux';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

const ShopList: NextPage = () => {
    const { boards } = useSelector<AppState, BoardState>(
        (props) => props.board,
    );

    return (
        <>
            <Head>
                <title>Shop</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <MyLayout>
                <div className="wr-pages-shop-list">
                    <div className="wr-pages-shop-list__body">
                        <ul className="wr-pages-shop-list__menu wr-mt">
                            <li className="wr-pages-shop-list__menuitem active">
                                <a>
                                    <span>KNIVES &amp; SUPPLIES</span>
                                </a>
                                <div className="wr-pages-shop-list__activebar"></div>
                            </li>
                            <li className="wr-pages-shop-list__menuitem">
                                <a>
                                    <span>BOARDS &amp; COASTERS</span>
                                </a>
                            </li>
                            <li className="wr-pages-shop-list__menuitem">
                                <a>
                                    <span>CHEESE &amp; PANTRY</span>
                                </a>
                            </li>
                            <li className="wr-pages-shop-list__menuitem">
                                <a>
                                    <span>SURPLUS SALE</span>
                                </a>
                            </li>
                        </ul>
                        <div className="wr-pages-shop-list__title">
                            KNIVES & SUPPLIES 22
                        </div>
                        <div className="wr-pages-shop-list__items">
                            <div className="wr-pages-shop-list__card">
                                <div className="wr-pages-shop-list__thumbnail">
                                    <img
                                        src="https://cdn.imweb.me/thumbnail/20161229/5864677d314be.jpg"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="wr-pages-shop-list__description">
                                    <p className="wr-pages-shop-list__pname">
                                        Carry On Cocktail Kit
                                    </p>
                                    <strong>24,000원</strong>
                                </div>
                            </div>
                            <div className="wr-pages-shop-list__card">
                                <div className="wr-pages-shop-list__thumbnail">
                                    <img
                                        src="https://cdn.imweb.me/thumbnail/20161229/5864677d6039c.jpg"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="wr-pages-shop-list__description">
                                    <p className="wr-pages-shop-list__pname">
                                        Jack Rudy Jigger
                                    </p>
                                    <strong>24,000원</strong>
                                </div>
                            </div>
                            <div className="wr-pages-shop-list__card">
                                <div className="wr-pages-shop-list__thumbnail">
                                    <img
                                        src="https://cdn.imweb.me/thumbnail/20161229/5864677d9c0d9.jpg"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="wr-pages-shop-list__description">
                                    <p className="wr-pages-shop-list__pname">
                                        Jack Rudy Barspoon
                                    </p>
                                    <strong>24,000원</strong>
                                </div>
                            </div>
                            <div className="wr-pages-shop-list__card">
                                <div className="wr-pages-shop-list__thumbnail">
                                    <img
                                        src="https://cdn.imweb.me/thumbnail/20161229/5864677dd319f.jpg"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="wr-pages-shop-list__description">
                                    <p className="wr-pages-shop-list__pname">
                                        Mason Shaker
                                    </p>
                                    <strong>24,000원</strong>
                                </div>
                            </div>
                            <div className="wr-pages-shop-list__card">
                                <div className="wr-pages-shop-list__thumbnail">
                                    <img
                                        src="https://cdn.imweb.me/thumbnail/20161229/5864677e074aa.jpg"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="wr-pages-shop-list__description">
                                    <p className="wr-pages-shop-list__pname">
                                        Sphere Bottle Opener
                                    </p>
                                    <strong>24,000원</strong>
                                </div>
                            </div>
                            <div className="wr-pages-shop-list__card">
                                <div className="wr-pages-shop-list__thumbnail">
                                    <img
                                        src="https://cdn.imweb.me/thumbnail/20161229/5864677e1bde1.jpg"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="wr-pages-shop-list__description">
                                    <p className="wr-pages-shop-list__pname">
                                        Wood Bottle Opener
                                    </p>
                                    <strong>24,000원</strong>
                                </div>
                            </div>
                            <div className="wr-pages-shop-list__card">
                                <div className="wr-pages-shop-list__thumbnail">
                                    <img
                                        src="https://cdn.imweb.me/thumbnail/20161229/5864677e31569.jpg"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="wr-pages-shop-list__description">
                                    <p className="wr-pages-shop-list__pname">
                                        Speckled Slate Tumbler
                                    </p>
                                    <strong>24,000원</strong>
                                </div>
                            </div>
                        </div>
                        <div className="wr-pages-shop-list__items">
                            <div className="wr-pages-shop-list__card">
                                <div className="wr-pages-shop-list__thumbnail">
                                    <img
                                        src="https://cdn.imweb.me/thumbnail/20161229/5864677d314be.jpg"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="wr-pages-shop-list__description">
                                    <p className="wr-pages-shop-list__pname">
                                        Carry On Cocktail Kit
                                    </p>
                                    <strong>24,000원</strong>
                                </div>
                            </div>
                            <div className="wr-pages-shop-list__card">
                                <div className="wr-pages-shop-list__thumbnail">
                                    <img
                                        src="https://cdn.imweb.me/thumbnail/20161229/5864677d6039c.jpg"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="wr-pages-shop-list__description">
                                    <p className="wr-pages-shop-list__pname">
                                        Jack Rudy Jigger
                                    </p>
                                    <strong>24,000원</strong>
                                </div>
                            </div>
                            <div className="wr-pages-shop-list__card">
                                <div className="wr-pages-shop-list__thumbnail">
                                    <img
                                        src="https://cdn.imweb.me/thumbnail/20161229/5864677d9c0d9.jpg"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="wr-pages-shop-list__description">
                                    <p className="wr-pages-shop-list__pname">
                                        Jack Rudy Barspoon
                                    </p>
                                    <strong>24,000원</strong>
                                </div>
                            </div>
                            <div className="wr-pages-shop-list__card">
                                <div className="wr-pages-shop-list__thumbnail">
                                    <img
                                        src="https://cdn.imweb.me/thumbnail/20161229/5864677dd319f.jpg"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="wr-pages-shop-list__description">
                                    <p className="wr-pages-shop-list__pname">
                                        Mason Shaker
                                    </p>
                                    <strong>24,000원</strong>
                                </div>
                            </div>
                            <div className="wr-pages-shop-list__card">
                                <div className="wr-pages-shop-list__thumbnail">
                                    <img
                                        src="https://cdn.imweb.me/thumbnail/20161229/5864677e074aa.jpg"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="wr-pages-shop-list__description">
                                    <p className="wr-pages-shop-list__pname">
                                        Sphere Bottle Opener
                                    </p>
                                    <strong>24,000원</strong>
                                </div>
                            </div>
                            <div className="wr-pages-shop-list__card">
                                <div className="wr-pages-shop-list__thumbnail">
                                    <img
                                        src="https://cdn.imweb.me/thumbnail/20161229/5864677e1bde1.jpg"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="wr-pages-shop-list__description">
                                    <p className="wr-pages-shop-list__pname">
                                        Wood Bottle Opener
                                    </p>
                                    <strong>24,000원</strong>
                                </div>
                            </div>
                            <div className="wr-pages-shop-list__card">
                                <div className="wr-pages-shop-list__thumbnail">
                                    <img
                                        src="https://cdn.imweb.me/thumbnail/20161229/5864677e31569.jpg"
                                        alt="thumbnail"
                                    />
                                </div>
                                <div className="wr-pages-shop-list__description">
                                    <p className="wr-pages-shop-list__pname">
                                        Speckled Slate Tumbler
                                    </p>
                                    <strong>24,000원</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MyFooter>
                        <MyPagination
                            requestAction={getPostsRequest}
                            successAction={getPostsSuccess}
                            payload={boards.lastPayload}
                            total={boards.total.count}
                        >
                            <span>
                                건수: {boards.total.count.toLocaleString()}
                            </span>
                        </MyPagination>
                    </MyFooter>
                </div>
            </MyLayout>
        </>
    );
};

export default ShopList;