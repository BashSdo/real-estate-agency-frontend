import gql from 'graphql-tag';

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    login
    email
    phone
    isEmployer
    createdAt
  }
`;

export const REALTY_FIELDS = gql`
  fragment RealtyFields on Realty {
    id
    kind
    address
    createdAt
  }
`;

export const CONTRACT_FIELDS = gql`
  ${REALTY_FIELDS}
  ${USER_FIELDS}
  fragment ContractFields on Contract {
    id
    name
    description
    createdAt
    expiresAt
    terminatedAt
    ... on EmploymentContract {
      employer {
        ...UserFields
      }
      baseSalary
    }
    ... on ManagementForRentContract {
      realty {
        ...RealtyFields
      }
      landlord {
        ...UserFields
      }
      employer {
        ...UserFields
      }
      expectedPrice
      expectedDeposit
      oneTimeFee
      monthlyFee
      percentFee
      isPlaced
    }
    ... on ManagementForSaleContract {
      realty {
        ...RealtyFields
      }
      landlord {
        ...UserFields
      }
      employer {
        ...UserFields
      }
      expectedPrice
      expectedDeposit
      oneTimeFee
      monthlyFee
      percentFee
      isPlaced
    }
    ... on RentContract {
      realty {
        ...RealtyFields
      }
      purchaser {
        ...UserFields
      }
      landlord {
        ...UserFields
      }
      employer {
        ...UserFields
      }
      price
      deposit
    }
    ... on SaleContract {
      realty {
        ...RealtyFields
      }
      purchaser {
        ...UserFields
      }
      landlord {
        ...UserFields
      }
      employer {
        ...UserFields
      }
      price
      deposit
    }
  }
`;

export const PLACEMENT_FIELDS = gql`
  ${CONTRACT_FIELDS}
  ${REALTY_FIELDS}
  ${USER_FIELDS}
  fragment PlacementFields on Placement {
    realty {
      ...RealtyFields
    }
    rentContract {
      ...ContractFields
    }
    saleContract {
      ...ContractFields
    }
    rentInfo {
      price
      deposit
      employer {
        ...UserFields
      }
    }
    saleInfo {
      price
      deposit
      employer {
        ...UserFields
      }
    }
  }
`;

export const MY_USER = gql`
  ${USER_FIELDS}
  query myUser {
    myUser {
      ...UserFields
    }
  }
`;

export const USER = gql`
  ${USER_FIELDS}
  query User($id: UserId!) {
    user(id: $id) {
      node {
        ...UserFields
      }
    }
  }
`;

export const USERS = gql`
  ${USER_FIELDS}
  query Users(
    $first: Int
    $after: UserListCursor
    $last: Int
    $before: UserListCursor
    $name: UserName
  ) {
    users(
      first: $first
      after: $after
      last: $last
      before: $before
      name: $name
    ) {
      edges {
        node {
          ...UserFields
        }
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
      }
    }
  }
`;

export const CREATE_USER = gql`
  ${USER_FIELDS}
  mutation CreateUser(
    $name: UserName!
    $login: UserLogin!
    $password: UserPassword!
    $email: UserEmail
    $phone: UserPhone
  ) {
    createUser(
      name: $name
      login: $login
      password: $password
      email: $email
      phone: $phone
    ) {
      token
      user {
        ...UserFields
      }
    }
  }
`;

export const CREATE_USER_SESSION = gql`
  ${USER_FIELDS}
  mutation CreateUserSession($login: UserLogin!, $password: UserPassword!) {
    createUserSession(login: $login, password: $password) {
      token
      user {
        ...UserFields
      }
    }
  }
`;

export const UPDATE_USER_NAME = gql`
  ${USER_FIELDS}
  mutation UpdateUserName($name: UserName!) {
    updateUserName(name: $name) {
      ...UserFields
    }
  }
`;

export const UPDATE_USER_EMAIL = gql`
  ${USER_FIELDS}
  mutation UpdateUserEmail($email: UserEmail!) {
    updateUserEmail(email: $email) {
      ...UserFields
    }
  }
`;

export const UPDATE_USER_PHONE = gql`
  ${USER_FIELDS}
  mutation UpdateUserPhone($phone: UserPhone!) {
    updateUserPhone(phone: $phone) {
      ...UserFields
    }
  }
`;

export const UPDATE_USER_PASSWORD = gql`
  ${USER_FIELDS}
  mutation UpdateUserPassword(
    $newPassword: UserPassword!
    $oldPassword: UserPassword!
  ) {
    updateUserPassword(newPassword: $newPassword, oldPassword: $oldPassword) {
      ...UserFields
    }
  }
`;

export const WAIT_SESSION = gql`
  subscription WaitSession {
    waitSession
  }
`;

export const REALTY = gql`
  ${REALTY_FIELDS}
  query Realty($id: RealtyId!) {
    realty(id: $id) {
      node {
        ...RealtyFields
      }
    }
  }
`;

export const REALTIES = gql`
  ${REALTY_FIELDS}
  query Realties(
    $first: Int
    $after: RealtyListCursor
    $last: Int
    $before: RealtyListCursor
    $address: RealtyAddress
  ) {
    realties(
      first: $first
      after: $after
      last: $last
      before: $before
      address: $address
    ) {
      edges {
        node {
          ...RealtyFields
        }
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
      }
    }
  }
`;

export const CREATE_REALTY = gql`
  ${REALTY_FIELDS}
  mutation CreateRealty(
    $country: RealtyCountry!
    $city: RealtyCity!
    $state: RealtyState
    $street: RealtyStreet!
    $zipCode: RealtyZipCode
    $buildingName: RealtyBuildingName!
    $numFloors: Int!
    $floor: Int
    $apartmentNum: RealtyApartmentNum
    $roomNum: RealtyRoomNum
  ) {
    createRealty(
      country: $country
      state: $state
      city: $city
      street: $street
      zipCode: $zipCode
      buildingName: $buildingName
      numFloors: $numFloors
      floor: $floor
      apartmentNum: $apartmentNum
      roomNum: $roomNum
    ) {
      ...RealtyFields
    }
  }
`;

export const CONTRACT = gql`
  ${CONTRACT_FIELDS}
  query Contract($id: ContractId!) {
    contract(id: $id) {
      node {
        ...ContractFields
      }
    }
  }
`;

export const CONTRACTS = gql`
  ${CONTRACT_FIELDS}
  query Contracts(
    $first: Int
    $after: ContractListCursor
    $last: Int
    $before: ContractListCursor
    $name: ContractName
  ) {
    contracts(
      first: $first
      after: $after
      last: $last
      before: $before
      name: $name
    ) {
      edges {
        node {
          ...ContractFields
        }
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
      }
    }
  }
`;

export const CREATE_EMPLOYMENT_CONTRACT = gql`
  ${CONTRACT_FIELDS}
  mutation CreateEmploymentContract(
    $name: ContractName!
    $description: ContractDescription!
    $expiresAt: DateTime
    $userId: UserId!
    $baseSalary: Money!
  ) {
    createEmploymentContract(
      name: $name
      description: $description
      expiresAt: $expiresAt
      userId: $userId
      baseSalary: $baseSalary
    ) {
      ...ContractFields
    }
  }
`;

export const CREATE_MANAGEMENT_FOR_RENT_CONTRACT = gql`
  ${CONTRACT_FIELDS}
  mutation CreateManagementForRentContract(
    $realtyId: RealtyId!
    $landlordId: UserId!
    $name: ContractName!
    $description: ContractDescription!
    $expiresAt: DateTime
    $expectedPrice: Money!
    $expectedDeposit: Money
    $oneTimeFee: Money
    $monthlyFee: Money
    $percentFee: Percent
    $makePlacement: Boolean
  ) {
    createManagementForRentContract(
      realtyId: $realtyId
      landlordId: $landlordId
      name: $name
      description: $description
      expiresAt: $expiresAt
      expectedPrice: $expectedPrice
      expectedDeposit: $expectedDeposit
      oneTimeFee: $oneTimeFee
      monthlyFee: $monthlyFee
      percentFee: $percentFee
      makePlacement: $makePlacement
    ) {
      ...ContractFields
    }
  }
`;

export const CREATE_MANAGEMENT_FOR_SALE_CONTRACT = gql`
  ${CONTRACT_FIELDS}
  mutation CreateManagementForSaleContract(
    $realtyId: RealtyId!
    $landlordId: UserId!
    $name: ContractName!
    $description: ContractDescription!
    $expiresAt: DateTime
    $expectedPrice: Money!
    $expectedDeposit: Money
    $oneTimeFee: Money
    $monthlyFee: Money
    $percentFee: Percent
    $makePlacement: Boolean
  ) {
    createManagementForSaleContract(
      realtyId: $realtyId
      landlordId: $landlordId
      name: $name
      description: $description
      expiresAt: $expiresAt
      expectedPrice: $expectedPrice
      expectedDeposit: $expectedDeposit
      oneTimeFee: $oneTimeFee
      monthlyFee: $monthlyFee
      percentFee: $percentFee
      makePlacement: $makePlacement
    ) {
      ...ContractFields
    }
  }
`;

export const CREATE_RENT_CONTRACT = gql`
  ${CONTRACT_FIELDS}
  mutation CreateRentContract(
    $realtyId: RealtyId!
    $purchaserId: UserId!
    $name: ContractName!
    $description: ContractDescription!
    $expiresAt: DateTime
    $price: Money!
    $deposit: Money
  ) {
    createRentContract(
      realtyId: $realtyId
      purchaserId: $purchaserId
      name: $name
      description: $description
      expiresAt: $expiresAt
      price: $price
      deposit: $deposit
    ) {
      ...ContractFields
    }
  }
`;

export const CREATE_SALE_CONTRACT = gql`
  ${CONTRACT_FIELDS}
  mutation CreateSaleContract(
    $realtyId: RealtyId!
    $purchaserId: UserId!
    $name: ContractName!
    $description: ContractDescription!
    $expiresAt: DateTime
    $price: Money!
    $deposit: Money
  ) {
    createSaleContract(
      realtyId: $realtyId
      purchaserId: $purchaserId
      name: $name
      description: $description
      expiresAt: $expiresAt
      price: $price
      deposit: $deposit
    ) {
      ...ContractFields
    }
  }
`;

export const TOGGLE_CONTRACT_PLACEMENT = gql`
  ${CONTRACT_FIELDS}
  mutation ToggleContractPlacement($id: ContractId!, $isPlaced: Boolean!) {
    toggleContractPlacement(id: $id, isPlaced: $isPlaced) {
      ...ContractFields
    }
  }
`;

export const TERMINATE_CONTRACT = gql`
  ${CONTRACT_FIELDS}
  mutation TerminateContract($id: ContractId!) {
    terminateContract(id: $id) {
      ...ContractFields
    }
  }
`;

export const PLACEMENT = gql`
  ${PLACEMENT_FIELDS}
  query Placement($id: RealtyId!) {
    placement(id: $id) {
      node {
        ...PlacementFields
      }
    }
  }
`;

export const PLACEMENTS = gql`
  ${PLACEMENT_FIELDS}
  query Placements(
    $first: Int
    $after: PlacementListCursor
    $last: Int
    $before: PlacementListCursor
    $includeRent: Boolean
    $includeSale: Boolean
  ) {
    placements(
      first: $first
      after: $after
      last: $last
      before: $before
      includeRent: $includeRent
      includeSale: $includeSale
    ) {
      edges {
        node {
          ...PlacementFields
        }
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
      }
    }
  }
`;

export const SALARY_REPORT = gql`
  ${USER_FIELDS}
  query SalaryReport($startAt: DateTime!, $endAt: DateTime!) {
    salaryReport(startAt: $startAt, endAt: $endAt) {
      rows {
        user {
          ...UserFields
        }
        contractsCount
        salary
      }
    }
  }
`;
