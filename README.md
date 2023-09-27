# [자료] EVM의 이해

# EVM?

[EVM의 정의](https://ethereum.org/en/developers/docs/evm/)(밑에서 5번째 줄부터 봐주시죠)

![스크린샷 2023-09-25 오후 9.16.36.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-09-25_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_9.16.36.png)

⇒ 중요하게 봐야할 포인트

1. 이더리움은 state machine이다.
2. state는 large data structure(:accounts + balances)
3. 이에 대한 정보를 바꿀수 있는것은 미리 정해진 룰에 의한 것이다.
4. 이 역할은 하는것은 EVM이다.

## State Machine (1+2에 대한 설명)

: 어떠한 원인에 의해 상태가 변하는 모델을 종종 이렇게 부릅니다.

그렇다면 EVM은 어떠한 원인에 의해 상태가 변하는 것일까?

- 원인: transaction
    
    ![스크린샷 2023-03-24 오전 12.30.01.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_12.30.01.png)
    
- 상태: 블록에 저장된 상태(계정의 잔액, 계정에 저장되어있는 정보)
    
    ![스크린샷 2023-03-24 오전 12.31.57.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_12.31.57.png)
    

## Pre-defined set of rules(3+4에 대한 설명)

- 결국 스마트컨트랙트 코드에 의해 상태가 변하는 것일것입니다.
- 그렇지만 코드도 결국 어떠한 규칙의 일련의 집합에 의해 생겨나는것이겠죠?
- 이 규칙의 최소단위를 [EVM Opcode](https://www.evm.codes/)라고 할 수 있을거 같습니다.
- 결국 노드들이 트랜잭션을 검증하고 실행결과가 똑같은지 체크하기 위한 일종의 룰을 가진 가상 실행 공간을 가지게 되는 것 그것이 EVM이라고 할 수 있습니다.

# Ethereum Block Structure

![Ethereum-block-header-and-state-merkle-tree.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/Ethereum-block-header-and-state-merkle-tree.png)

- State Root
    - Storage Root - storage variable root
    - code hash - EVM code hash
    - nonce - transaction을 구별하기 위한 nonce 값, transaction hash 값을 통해 transaction을 구별
        - transaction을 발생할때 마다 nonce값을 하나씩 증가
        - nonce값으로 이중지불 문제를 해결
        - [[트랜잭션 hash를 구하는 방법]](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)
    - balance
- Transactions Root
    - 트랜잭션의 merkle root
- Receipts Root
    - event log
    - 나중에 transaction이 발생하고 나서 event 정보를 가져오기 위한 root

결론적으로 트랜잭션(스마트컨트랙트 코드의 함수 실행)은 EVM에서 실행되어 위와 같은 상태를 저장하는 block들의 root를 변경하게 된다!

![스크린샷 2023-03-24 오전 1.33.16.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_1.33.16.png)

트랙잭션이 어떻게 EVM에서 실행되는지 알아보기 전에 먼저 계정에 관한 EVM 규칙에 대해 설명해보겠습니다.

# Account?

EVM은 CA와 EOA라는 계정으로 구분됩니다. 

- CA(**Contract Address**): 컨트랙트 주소(계정)
- EOA(**Externally Owned Account**): 외부 계정, 서명자, 지갑,…
- 이더리움 분산 네트워크는 각각의 계정에 대응하는 정보를 저장하게 되는것입니다.
- 계정에 따라 Account state에 저장되는 정보도 다르게 됩니다.
- EOA의 Account State
    - nonce
    - balance
- CA의 Account State
    - nonce
    - balance
    - storage hash - storage state에 대한 값을 저장
    - code hash - Smart Contract Code의 hash 값을 저장
- ex) BV POAP
    - nonce - 1
    - balance - 10eth
    - storage hash - ((학회원들 점수 매핑), (학회원들 출석), (운영진 주소)….)의 hash
    - code hash - bytecode의 hash 값을 저장
- ex) 진수하
    - nonce - 40
    - balance - 2eth

![스크린샷 2023-03-24 오전 12.38.19.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_12.38.19.png)

![스크린샷 2023-03-24 오전 12.33.19.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_12.33.19.png)

[*code로 이해하고 싶으시면 밑에 그림을 참조]*

![스크린샷 2023-03-24 오전 12.40.51.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_12.40.51.png)

![스크린샷 2023-03-24 오전 12.40.11.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_12.40.11.png)

## Address 결정 방법

- 각각의 Account가 대응되는 Address 구하는 법 *[Contract account 방법은 변했으니 주의!]*

![스크린샷 2023-03-24 오전 12.44.02.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_12.44.02.png)

- EOA
    - private key: random number
    - public key: ECDSA 방법에 의해 결정된 key
    - EOA address: public key를 keccack256 hash하고 앞에 160비트를 사용(20bytes)
        
        ![스크린샷 2023-09-25 오후 10.04.44.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-09-25_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_10.04.44.png)
        
    - [암호학 더 자세한 내용](https://cryptobook.nakov.com/digital-signatures)
- CA
    - [EIP1014](https://eips.ethereum.org/EIPS/eip-1014)
    - salt + 배포자 주소 + keccak256(init_code) 에 의해 결정됩니다.

# Transaction

**트랜잭션의 종류**

- contract creation
- message call
    
    **message** :Data (as a set of bytes) and Value (specified as Ether) between Accounts
    

![스크린샷 2023-03-24 오전 1.26.05.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_1.26.05.png)

### Contract Creation

- 새로운 컨트랙트(state)를 생성하는 작업
- 당연히 가스비도 많이 들겠죠?!

![스크린샷 2023-03-24 오전 1.26.33.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_1.26.33.png)

### **Message Call**

- 계정의 종류는 CA와 EOA가 있기 때문에 데이터를 서로 교환하는 메시지콜의 종류는?

![스크린샷 2023-03-24 오전 1.27.01.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_1.27.01.png)

아래의 4가지 케이스가 존재하게 됩니다.

![스크린샷 2023-03-24 오전 1.22.03.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_1.22.03.png)

# EVM Structure

EVM은 stack, memory, PC, gas, EVM code, storage로 요소들이 구성되어 있습니다.

![스크린샷 2023-03-24 오전 1.33.36.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_1.33.36.png)

![스크린샷 2023-03-24 오전 1.36.39.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_1.36.39.png)

- **stack**: 함수의 실행공간, 주로 지역변수와 계산을 할때 사용하는 메모리 공간
- **memory**: 이 또한 함수의 실행 공간으로 스택과 약간 다른 기능을 수행합니다. argument를 받거나 스택에서 계산하고 임시로 값을 저장하는 공간입니다. 함수간에 값을 전달할때 주로 사용합니다.
- **storage:** 실질적으로 state가 반영되는 공간, stack과 memory에서 실행을 하고 storage에서 실질적으로 값을 반영하게 됩니다.
- **PC(program counter):** 코드를 한줄 한줄 가리키고 있는 포인터(EVM code를 가리키는 포인터),특정 opcode에서는 포인터가 필요하기 때문이라고 생각하시면 됩니다.(컴퓨터구조 지식이니 한번 검색해보시는 걸 추천합니다.)
- **gas**: 유저가 트랜잭션을 서명할때 보내는 가스비를 저장하는 공간, opcode 실행될때마다 gas가 줄어들면서 실행가능한 transaction인지 확인
    - gas가 부족하면 revert
    - gas가 충분하면 return 과 함께 state 변화
    
    ![스크린샷 2023-03-24 오전 1.43.03.png](%5B%E1%84%8C%E1%85%A1%E1%84%85%E1%85%AD%5D%20EVM%E1%84%8B%E1%85%B4%20%E1%84%8B%E1%85%B5%E1%84%92%E1%85%A2%200fc02c801b414d78a22072d3fbfe580a/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_1.43.03.png)
    

# Sample Contract(WETH.sol)로 알아보는 EVM 복습

[[Sample Contract]](https://github.com/djm07073/EVM-Sample-Contract)

각각의 스크립트를 실행해보면서 트랜잭션이 어떻게 생성되고 처리되는지 살펴봅시다!

그리고 한번 더 개념을 정리해봅시다!

당연히 트랜잭셔의 시작은 EOA일 수 밖에 없습니다…!

- EVM-Create-Contract: (EOA → “    “)
    - WETH contract를 배포하는 트랜잭션
    - [트랜잭션 실행결과](https://sepolia.etherscan.io/tx/0x901ab569b4cb310aca69861f816e108728b9287b4af400c29e81c758afc0fdc4)
- EVM-Message-Call-type1 (EOA → EOA)
    - 다른 주소(BOB)로 0.1 ETH 전송하는 트랜잭션
        - 트랙잭션 이전 Alice, Bob의 state: (Alice: 0.5 ETH, Bob: 0 ETH)
        - 이후의 state:  (Alice: 0.4 ETH, Bob: 0.1 ETH)
    - [트랜잭션 실행결과](https://sepolia.etherscan.io/tx/0x5e3650924a27ab2471419d3ebcd7254374140b1680fcd74ab9d1fc08350f7603)
- EVM-Message-Call-type2(EOA → CA)
    - Alice가 0.2ETH를 deposit해서 0.2 WETH얻기
        - 트랙잭션 이전 Alice 의 state
            - `balance` 0.4 ETH
        - 이후의 state
            - `balance` 0.2 ETH
        
        ---
        
        - 트랙잭션 이전 WETH컨트랙트의 state
            - `mapping(address => uint) public balanceOf`(Alice: 0 WETH)
            - `balance` : 0 ETH
        - 이후의 state
            - `mapping(address => uint) public balanceOf`(Alice: 0.2 WETH)
            - `balance` : 0.2 ETH
    - [트랜잭션 실행결과](https://sepolia.etherscan.io/tx/0xafde9711ec213331dec1470656e71de7e71cf71a97035e6ea127e4d705b919e0)
- EVM-Message-Call-type3 (EOA → CA → CA)
    - Alice가 LockWETH Contract의 take function을 통해 LockWETH Contract로 0.1 WETH 이동
        - 트랜잭션 이전 WETH 컨트랙트의 state
            - `mapping(address => uint) public balanceOf`(Alice: 0.2 WETH , LockWETH : 0 WETH)
            - `balance` : 0.1 ETH
        - 이후의 state
            - `mapping(address => uint) public balanceOf`(Alice: 0.1 WETH , LockWETH : 0.1 WETH)
            - `balance` : 0.1 ETH
        
        ---
        
        - 트랜잭션 이전 LockWETH컨트랙트의 state
            - `mapping(address => uint) public takeAmount` (Alice: 0 WETH)
        - 이후의 state
            - `mapping(address => uint) public takeAmount` (Alice: 0.1 WETH )
    - 트랜잭션 실행결과
- EVM-Message-Call-type4 (EOA→ CA → EOA)
    - WETH Contract에서 ETH withdraw
        - 트랙잭션 이전 Alice 의 state
            - `balance` 0.2 ETH
        - 이후의 state
            - `balance` 0.3 ETH
        
        ---
        
        - 트랙잭션 이전 WETH컨트랙트의 state
            - `mapping(address => uint) public balanceOf`(Alice: 0.1 WETH, LockWETH:0.1 )
            - `balance` : 0.2 ETH
        - 이후의 state
            - `mapping(address => uint) public balanceOf`(Alice: 0 WETH, LockWETH:0.1)
            - `balance` : 0.1 ETH

## Function selector, ABI, Interface

- 그렇다면 message call을 하기 위해서는 사전에 어떤 것들이 필요할까?
    - 어디에? ⇒ 컨트랙트 주소 혹은 지갑 주소
    - 어떤 함수를? ⇒ Function selector
    - 어떤 input을? ⇒ interface, ABI

## Receipt

- 영수증?
    - transaction이 실행되고 결과를 박제하는 과정
        
        ```jsx
        ContractTransactionReceipt {
          provider: HardhatEthersProvider {
            _hardhatProvider: LazyInitializationProviderAdapter {
              _providerFactory: [AsyncFunction (anonymous)],
              _emitter: [EventEmitter],
              _initializingPromise: [Promise],
              provider: [BackwardsCompatibilityProviderAdapter]
            },
            _networkName: 'sepolia',
            _blockListeners: [],
            _transactionHashListeners: Map(0) {},
            _eventListeners: [],
            _isHardhatNetworkCached: false,
            _transactionHashPollingInterval: undefined
          },
          to: '0x68b62b199158bDc2E89f80F47f9a9b9dc0f9E523',
          from: '0xf768a8FD04c16193aCd2F613b8374C1D7e521509',
          contractAddress: null,
          hash: '0xafde9711ec213331dec1470656e71de7e71cf71a97035e6ea127e4d705b919e0',
          index: 30,
          blockHash: '0x0abf5bfc0e16d4ccf5ffb15ba0da4138225654639cfb70af002fb3e314a10f89',
          blockNumber: 4372701,
          logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000002000080000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000010000000400000000000000000',
          gasUsed: 45248n,
          cumulativeGasUsed: 11496952n,
          gasPrice: 100000062n,
          type: 2,
          status: 1,
          root: undefined
        }
        ```
        
- Event 정보를 저장
- **필요한 이유**
    - transaction 실행로그를 저장하기 위해
    - 검색에 용이하기 위해, 오프체인으로 온체인 정보를 검색하기 위해

## [Reference]

[https://ethereum.org/en/developers/docs/evm/](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)
