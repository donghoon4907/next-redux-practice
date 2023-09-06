// 페이지네이션 - 페이징버튼 생성
export function createPageButtons(
    totalCount: number,
    pageSize: number,
    currentPage: number,
    blockSize: number = 5,
) {
    let totalPages = Math.ceil(totalCount / pageSize);
    let currentBlock = Math.ceil(currentPage / blockSize);
    let startPage = (currentBlock - 1) * blockSize + 1;
    let endPage = Math.min(startPage + blockSize - 1, totalPages);

    let pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(i);
    }

    return pageButtons;
}
