import { CONTRACTS, PLACEMENTS, REALTIES, USERS } from '@/graphql/api';
import { useQuery } from '@vue/apollo-composable';

export class Pagination {
  constructor (query) {
    this.query = useQuery(query, null, {
      errorPolicy: 'ignore',
      fetchPolicy: 'standby',
    });

    this.loading = this.query.loading;
    this.error = this.query.error;

    this.page = ref(1);
    this.items = ref([]);
    this.itemsPerPage = ref(10);
    this.totalCount = ref(0);

    this.startCursor = null;
    this.endCursor = null;

    this.args = {
      first: null,
      after: null,
      last: null,
      before: null,
    };

    watch(
      this.page,
      (cur, old) => {
        if (!old) {
          this.nextPage();
          return;
        }

        if (cur === old + 1) {
          this.nextPage();
          return;
        }

        if (cur === old - 1) {
          this.prevPage();
          return;
        }

        if (cur === 1) {
          this.firstPage();
          return;
        }

        this.lastPage();
      },
      {
        immediate: true,
      },
    );
    watch(this.itemsPerPage, () => this.refreshPage());
  }

  async nextPage () {
    this.args.first = this.itemsPerPage.value;
    this.args.after = this.endCursor;
    this.args.last = null;
    this.args.before = null;

    const data = await this.fetch();
    this.items.value = data?.edges.map(edge => edge.node) || [];
    this.startCursor = data?.pageInfo.startCursor;
    this.endCursor = data?.pageInfo.endCursor;
    this.totalCount.value = data?.pageInfo.totalCount || 0;
  }

  async prevPage () {
    this.args.first = null;
    this.args.after = null;
    this.args.last = this.itemsPerPage.value;
    this.args.before = this.startCursor;

    const data = await this.fetch();
    this.items.value = data?.edges.map(edge => edge.node).reverse() || [];
    this.startCursor = data?.pageInfo.endCursor;
    this.endCursor = data?.pageInfo.startCursor;
    this.totalCount.value = data?.pageInfo.totalCount || 0;
  }

  async refreshPage () {
    this.args.first = this.itemsPerPage.value;
    this.args.after = this.startCursor;
    this.args.last = null;
    this.args.before = this.startCursor;

    const data = await this.fetch();
    this.items.value = data?.edges.map(edge => edge.node) || [];
    this.startCursor = data?.pageInfo.startCursor;
    this.endCursor = data?.pageInfo.endCursor;
    this.totalCount.value = data?.pageInfo.totalCount || 0;
  }

  async firstPage () {
    this.args.first = this.itemsPerPage.value;
    this.args.after = null;
    this.args.last = null;
    this.args.before = null;

    const data = await this.fetch();
    this.items.value = data?.edges.map(edge => edge.node) || [];
    this.startCursor = data?.pageInfo.startCursor;
    this.endCursor = data?.pageInfo.endCursor;
    this.totalCount.value = data?.pageInfo.totalCount || 0;
  }

  async lastPage () {
    this.args.first = null;
    this.args.after = null;
    this.args.last = this.itemsPerPage.value;
    this.args.before = null;

    const data = await this.fetch();
    this.items.value = data?.edges.map(edge => edge.node).reverse() || [];
    this.startCursor = data?.pageInfo.endCursor;
    this.endCursor = data?.pageInfo.startCursor;
    this.totalCount.value = data?.pageInfo.totalCount || 0;
  }

  async fetch () {
    const resp = await this.query.refetch(this.args);
    const data = resp.data;
    if (!data) {
      return null;
    }

    const key = Object.keys(data)[0];
    return data[key];
  }
}

export class UsersPagination extends Pagination {
  constructor () {
    super(USERS);
    this.search = ref('');
    watch(this.search, search => {
      this.args.name = search || null;
      this.firstPage();
    });
  }
}

export class RealtiesPagination extends Pagination {
  constructor () {
    super(REALTIES);
    this.search = ref('');
    watch(this.search, search => {
      this.args.address = search || null;
      this.firstPage();
    });
  }
}

export class ContractsPagination extends Pagination {
  constructor () {
    super(CONTRACTS);
    this.search = ref('');
    watch(this.search, search => {
      this.args.name = search || null;
      this.firstPage();
    });
  }
}

export class PlacementsPagination extends Pagination {
  constructor () {
    super(PLACEMENTS);

    this.includeRent = ref(true);
    watch(this.includeRent, include => {
      this.args.includeRent = include;
      this.firstPage();
    });

    this.includeSale = ref(true);
    watch(this.includeSale, include => {
      this.args.includeSale = include;
      this.firstPage();
    });
  }
}
