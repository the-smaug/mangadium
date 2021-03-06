import { types, flow, applySnapshot, getParent } from 'mobx-state-tree'
import { arrayOf } from 'prop-types'
import { Manga, MangaPropTypes } from './Manga'
import request from '../utils/request'

export const ListPropTypes = { mangas: arrayOf(MangaPropTypes) }

export const List = types
  .model({
    mangas: types.optional(types.array(Manga), [])
  })
  .actions(self => ({
    afterCreate () {
      self.hyrdate()
    },
    hyrdate: flow(function * () {
      try {
        const mangas = yield request.getTopMangas()

        self.setMangas(mangas)
      } catch (error) {
        const appStore = getParent(self).app
        appStore.pushError('Je ne peux pas charger la liste des mangas, surrement la faute du back')
      }
    }),
    setMangas (mangas) {
      applySnapshot(self.mangas, mangas)
    }
  }))
