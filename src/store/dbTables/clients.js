import { observable, computed, action } from 'mobx'
import StoreClass from '../StoreClass'
import clients from '~/api/db/clients'

export default class Clients extends StoreClass {
  constructor(rootStore) {
    super(rootStore)
    this.table = 'clients'
    this.defaultItems = [
      {
        title: 'ОАО «Газпромбанк»',
        id: '5',
        taskCode: '1310',
        taskIdCr: '1310',
      },
      {
        title: 'ПАО «МТС»',
        id: '19',
        taskCode: '',
        taskIdCr: '',
        jira: 'https://jira.mts.ru',
        git: 'https://git.shop.mts.ru/shop/backend/site_bitrix',
      },
      {
        title: 'ЛЕНВЕНДО',
        id: '4',
        taskCode: '1080',
        taskIdCr: '1080',
        jira: 'https://lenvendo.atlassian.net/',
      },
      {
        title: 'ООО "Эльдорадо"',
        id: '2',
        taskCode: '1399',
        taskIdCr: '1399',
      },
      {
        title: 'Либерти Страхование (ОАО)',
        id: '18',
        taskCode: '1207',
        taskIdCr: '1207',
      },
      {
        title: 'Мвидео',
        id: '23',
        taskCode: '1466',
        taskIdCr: '1466',
        jira: 'https://jira.goods.ru',
        git: 'https://gitlab.goodsteam.tech/goods/customers-experience/marketing-team/advertiser-ui',
      },
      {
        title: 'МЕД-МАГАЗИН',
        id: '35',
        taskCode: '1305',
        taskIdCr: '1305',
      },
      {
        title: 'Фишер',
        id: '37',
        taskCode: '1434',
        taskIdCr: '1434',
        jira: 'https://lenvendo-ru.atlassian.net',
        git: 'https://git.repo.services.lenvendo.ru/project/fischer/frontend',
      },
    ]
  }

  @action newClient() {
    this.rootStore.dbStore
      .saveTableRow(this.table, clients.getNew())
      .then((res) => {
        const newItem = clients.getNew()
        newItem.key = res
        this.items.push(newItem)
      })
  }

  @action loadClients() {
    this.rootStore.dbStore.loadTableRowsWithKeys(this.table).then((data) => {
      if (Array.isArray(data) && data.length) {
        data.forEach((item) => this.items.push(item))
      } else {
        this.loadDefault()
      }
    })
  }

  @action changeClient(key, field, value) {
    this.items.find((item) => item.key == key)[field] = value
  }

  @action saveClient(Client) {
    this.rootStore.dbStore.saveTableRow(this.table, Client, Client.key)
  }

  @action deleteClient(Client) {
    this.items = this.items.filter((item) => Client.key != item.key)
    this.rootStore.dbStore.deleteTableRow(this.table, Client.key)
  }
}
