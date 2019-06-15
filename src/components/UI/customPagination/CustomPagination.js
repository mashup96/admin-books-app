import React from 'react';
import PropTypes from "prop-types";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './CustomPagination.scss';

class CustomPagination extends React.Component {

  handleClick(e, index) {
    e.preventDefault();
    this.props.updateCurrentPage(index);
  }

  render() {
    const { numTotalElements, pageSize } = this.props;
    const { currentPage } = this.props;
    const pagesCount = Math.ceil(numTotalElements / pageSize);
    return (
      <React.Fragment>
        <div className="pagination-wrapper">
          <Pagination aria-label="Page navigation example">
            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink
                onClick={e => this.handleClick(e, currentPage - 1)}
                previous
                href="#"
              />
            </PaginationItem>
            {[...Array(pagesCount)].map((page, i) =>
              <PaginationItem active={i === currentPage} key={i}>
                <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem disabled={currentPage >= pagesCount - 1}>
              <PaginationLink
                onClick={e => this.handleClick(e, currentPage + 1)}
                next
                href="#"
              />
            </PaginationItem>
          </Pagination>
        </div>
      </React.Fragment>
    );
  }
}

CustomPagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  numTotalElements: PropTypes.number.isRequired,
  updateCurrentPage: PropTypes.func.isRequired
}

export default CustomPagination;