import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
export var TxAction;
(function (TxAction) {
    TxAction[TxAction["APPROVAL"] = 0] = "APPROVAL";
    TxAction[TxAction["MAIN_ACTION"] = 1] = "MAIN_ACTION";
    TxAction[TxAction["GAS_ESTIMATION"] = 2] = "GAS_ESTIMATION";
})(TxAction || (TxAction = {}));
export const getErrorTextFromError = (error, txAction, blocking = true) => {
    let errorNumber = 1;
    if (error.message ===
        "MetaMask Tx Signature: User denied transaction signature." ||
        error.message ===
            "MetaMask Message Signature: User denied message signature.") {
        return {
            error: errorMapping[4001],
            blocking: false,
            actionBlocked: false,
            rawError: error,
            txAction,
        };
    }
    // Try to parse the Pool error number from RPC provider revert error
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsedError = JSON.parse(error?.error?.body);
        const parsedNumber = Number(parsedError.error.message.split(": ")[1]);
        if (!isNaN(parsedNumber)) {
            errorNumber = parsedNumber;
        }
    }
    catch {
        console.error(error);
    }
    const errorRender = errorMapping[errorNumber];
    if (errorRender) {
        return {
            error: errorRender,
            blocking,
            actionBlocked: true,
            rawError: error,
            txAction,
        };
    }
    return {
        error: undefined,
        blocking,
        actionBlocked: true,
        rawError: error,
        txAction,
    };
};
export const errorMapping = {
    // 1: <span>The caller of the function is not a pool admin</span>,
    // 2: <span>The caller of the function is not an emergency admin</span>,
    // 3: <span>The caller of the function is not a pool or emergency admin</span>,
    // 4: <span>The caller of the function is not a risk or pool admin</span>,
    // 5: <span>The caller of the function is not an asset listing or pool admin</span>,
    // 6: <span>The caller of the function is not a bridge</span>,
    7: _jsx("span", { children: "Pool addresses provider is not registered" }),
    // 8: <span>Invalid id for the pool addresses provider</span>,
    9: _jsx("span", { children: "Address is not a contract" }),
    // 10: <span>The caller of the function is not the pool configurator</span>,
    11: _jsx("span", { children: "The caller of the function is not an AToken" }),
    12: _jsx("span", { children: "The address of the pool addresses provider is invalid" }),
    13: _jsx("span", { children: "Invalid return value of the flashloan executor function" }),
    // 14: <span>Reserve has already been added to reserve list</span>,
    // 15: <span>Maximum amount of reserves in the pool reached</span>,
    // 16: <span>Zero eMode category is reserved for volatile heterogeneous assets</span>,
    // 17: <span>Invalid eMode category assignment to asset</span>,
    // 18: <span>The liquidity of the reserve needs to be 0</span>,
    19: _jsx("span", { children: "Invalid flashloan premium" }),
    // 20: <span>Invalid risk parameters for the reserve</span>,
    // 21: <span>Invalid risk parameters for the eMode category</span>,
    22: _jsx("span", { children: "Invalid bridge protocol fee" }),
    23: _jsx("span", { children: "The caller of this function must be a pool" }),
    24: _jsx("span", { children: "Invalid amount to mint" }),
    25: _jsx("span", { children: "Invalid amount to burn" }),
    26: _jsx("span", { children: "Amount must be greater than 0" }),
    27: _jsx("span", { children: "Action requires an active reserve" }),
    28: _jsx("span", { children: "Action cannot be performed because the reserve is frozen" }),
    29: _jsx("span", { children: "Action cannot be performed because the reserve is paused" }),
    30: _jsx("span", { children: "Borrowing is not enabled" }),
    31: _jsx("span", { children: "Stable borrowing is not enabled" }),
    32: _jsx("span", { children: "User cannot withdraw more than the available balance" }),
    // 33: <span>Invalid interest rate mode selected</span>,
    34: _jsx("span", { children: "The collateral balance is 0" }),
    35: _jsx("span", { children: "Health factor is lesser than the liquidation threshold" }),
    36: _jsx("span", { children: "There is not enough collateral to cover a new borrow" }),
    37: (_jsx("span", { children: "Collateral is (mostly) the same currency that is being borrowed" })),
    38: (_jsx("span", { children: "The requested amount is greater than the max loan size in stable rate mode" })),
    39: (_jsx("span", { children: "For repayment of a specific type of debt, the user needs to have debt that type" })),
    40: (_jsx("span", { children: "To repay on behalf of a user an explicit amount to repay is needed" })),
    41: (_jsx("span", { children: "User does not have outstanding stable rate debt on this reserve" })),
    42: (_jsx("span", { children: "User does not have outstanding variable rate debt on this reserve" })),
    43: _jsx("span", { children: "The underlying balance needs to be greater than 0" }),
    44: _jsx("span", { children: "Interest rate rebalance conditions were not met" }),
    45: _jsx("span", { children: "Health factor is not below the threshold" }),
    46: _jsx("span", { children: "The collateral chosen cannot be liquidated" }),
    47: _jsx("span", { children: "User did not borrow the specified currency" }),
    48: _jsx("span", { children: "Borrow and repay in same block is not allowed" }),
    49: _jsx("span", { children: "Inconsistent flashloan parameters" }),
    50: _jsx("span", { children: "Borrow cap is exceeded" }),
    51: _jsx("span", { children: "Supply cap is exceeded" }),
    52: _jsx("span", { children: "Unbacked mint cap is exceeded" }),
    53: _jsx("span", { children: "Debt ceiling is exceeded" }),
    54: _jsx("span", { children: "AToken supply is not zero" }),
    55: _jsx("span", { children: "Stable debt supply is not zero" }),
    56: _jsx("span", { children: "Variable debt supply is not zero" }),
    57: _jsx("span", { children: "Ltv validation failed" }),
    // 58: <span>Inconsistent eMode category</span>,
    // 59: <span>Price oracle sentinel validation failed</span>,
    60: _jsx("span", { children: "Asset is not borrowable in isolation mode" }),
    // 61: <span>Reserve has already been initialized</span>,
    62: _jsx("span", { children: "User is in isolation mode" }),
    // 63: <span>Invalid ltv parameter for the reserve</span>,
    // 64: <span>Invalid liquidity threshold parameter for the reserve</span>,
    // 65: <span>Invalid liquidity bonus parameter for the reserve</span>,
    // 66: <span>Invalid decimals parameter of the underlying asset of the reserve</span>,
    // 67: <span>Invalid reserve factor parameter for the reserve</span>,
    // 68: <span>Invalid borrow cap for the reserve</span>,
    // 69: <span>Invalid supply cap for the reserve</span>,
    // 70: <span>Invalid liquidation protocol fee for the reserve</span>,
    // 71: <span>Invalid eMode category for the reserve</span>,
    // 72: <span>Invalid unbacked mint cap for the reserve</span>,
    // 73: <span>Invalid debt ceiling for the reserve</span>,
    // 74: <span>Invalid reserve index</span>,
    // 75: <span>ACL admin cannot be set to the zero address</span>,
    76: _jsx("span", { children: "Array parameters that should be equal length are not" }),
    77: _jsx("span", { children: "Zero address not valid" }),
    78: _jsx("span", { children: "Invalid expiration" }),
    79: _jsx("span", { children: "Invalid signature" }),
    80: _jsx("span", { children: "Operation not supported" }),
    81: _jsx("span", { children: "Debt ceiling is not zero" }),
    82: _jsx("span", { children: "Asset is not listed" }),
    // 83: <span>Invalid optimal usage ratio</span>,
    // 84: <span>Invalid optimal stable to total debt ratio</span>,
    85: _jsx("span", { children: "The underlying asset cannot be rescued" }),
    // 86: <span>Reserve has already been added to reserve list</span>,
    // 87: (
    //   <span>
    //     The token implementation pool address and the pool address provided by the initializing pool
    //     do not match
    //   </span>
    // ),
    88: _jsx("span", { children: "Stable borrowing is enabled" }),
    89: (_jsx("span", { children: "User is trying to borrow multiple assets including a siloed one" })),
    // 90: <span>the total debt of the reserve needs to be</span>,
    4001: _jsx("span", { children: "You cancelled the transaction." }),
};
