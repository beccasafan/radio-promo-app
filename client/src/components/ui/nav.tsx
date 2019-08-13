import React from 'react';
import * as bs from 'src/bootstrap.scss';
import { NavLink, Link } from 'react-router-dom';

interface OwnProps {
    page: number;
    pageSize: number;
    totalItems: number;
    description: string;
    onPreviousClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    onNextClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Nav = (props: OwnProps) => (
    <nav aria-label={`${props.description} Pager`}>
        <ul className={`${bs.pagination} ${bs.justifyContentCenter}`}>
        {props.page <= 1 ? <li className={`${bs.pageItem} ${bs.disabled}`}><a href="#" className={bs.pageLink} tabIndex={-1}>Previous</a></li> : <li className={bs.pageItem}><a href="#" className={bs.pageLink} onClick={props.onPreviousClick}>Previous</a></li>}
        <li className={`${bs.pageItem} ${bs.disabled}`}><a className={bs.pageLink} tabIndex={-1} href="#">Showing {(props.page - 1) * props.pageSize + 1} - {Math.min(props.totalItems, props.pageSize * props.page)} of {props.totalItems}</a></li>
        {props.page >= Math.ceil(props.totalItems / props.pageSize) ? <li className={`${bs.pageItem} ${bs.disabled}`}><a href="#" className={bs.pageLink} tabIndex={-1}>Next</a></li> : <li className={bs.pageItem}><a href="#" className={bs.pageLink} onClick={props.onNextClick}>Next</a></li>}
        </ul>
    </nav>
);

export default Nav;