import type { FC } from 'react';
import { useState } from 'react';
import { Header } from '@layouts/header/Header';

export const Dashboard: FC = () => {
    return (
        <>
            <Header />
            <div className="app-main">
                {/* <AppSidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <Route
                            path={`${match.url}/basic`}
                            component={BasicDashboard}
                        />
                    </div>
                    <AppFooter />
                </div> */}
            </div>
        </>
    );
};
