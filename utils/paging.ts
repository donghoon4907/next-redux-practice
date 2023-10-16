// 페이지네이션 - 페이징버튼 생성 deprecated
// export function createPageButtons(
//     totalCount: number,
//     pageSize: number,
//     currentPage: number,
//     blockSize: number = 5,
// ) {
//     let totalPages = Math.ceil(totalCount / pageSize);
//     let currentBlock = Math.ceil(currentPage / blockSize);
//     let startPage = (currentBlock - 1) * blockSize + 1;
//     let endPage = Math.min(startPage + blockSize - 1, totalPages);

//     let pageButtons = [];
//     for (let i = startPage; i <= endPage; i++) {
//         pageButtons.push(i);
//     }

//     return pageButtons;
// }
// 페이지네이션 - 페이징버튼 생성
export function createPageButtons(
    totalPages: number,
    currentPage: number,
    buttonCount: number = 5,
) {
    const pageButtons = [];
    const halfButtonCount = Math.floor(buttonCount / 2);

    // 현재 페이지 기준으로 시작 페이지와 끝 페이지를 계산합니다.
    let startPage = currentPage - halfButtonCount;
    let endPage = currentPage + halfButtonCount;

    // 시작 페이지와 끝 페이지를 조정하여 유효한 페이지 범위를 유지하고 음수를 필터링합니다.
    if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(totalPages, buttonCount);
    }
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - buttonCount + 1);
    }

    // 페이지 버튼을 생성합니다.
    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(i);
    }

    return pageButtons;
}
