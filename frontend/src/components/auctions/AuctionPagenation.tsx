'use client';
import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { buttonVariants } from '../ui/button';
interface Props {
    currentPage: number;
    pageCount: number;
    pageChaged: (page: number) => void;
};
const AuctionPagenation = ({ currentPage, pageCount, pageChaged }: Props) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className='cursor-pointer' onClick={() => {
                        if (currentPage === 1) {
                            pageChaged(currentPage);
                        }
                        else {
                            pageChaged(currentPage - 1);
                        }
                    }} />
                </PaginationItem>
                {
                    [...Array(pageCount)].map((_, index) => {
                        return <PaginationItem key={index + 1} >
                            <PaginationLink onClick={() => pageChaged(index + 1)} className={buttonVariants(
                                {
                                    variant: currentPage === index + 1 ? 'default' : 'ghost',
                                    className: 'cursor-pointer'
                                }
                            )}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    })
                }
                <PaginationItem>
                    <PaginationNext  className='cursor-pointer' onClick={() => {
                        if (currentPage < pageCount) {
                            pageChaged(currentPage + 1)
                        }
                    }} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default AuctionPagenation