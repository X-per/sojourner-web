<template>
  <v-list-tile v-if="event" class="event" :to="`/event/${event.id}`">
    <v-list-tile-content v-ripple>
      <v-list-tile-sub-title>
        <span v-if="showDay">
          {{ event.day.name }}
        </span>
        <span>
          {{ event.startTime }}-{{ event.endTime }}
        </span>
        <span v-if="hasRooms && showRoom">
          | {{ event.room.name }}
          <room-state :room="event.room"></room-state>
        </span>
        <span v-if="showTrack">
          | {{ event.track.name }}
        </span>
        <span v-if="showType">
          | {{ event.type.name }}
        </span>
        <span v-if="showPersons && event.persons.length > 0">
          | {{ event.persons.join(', ') }}
        </span>
      </v-list-tile-sub-title>
      <v-list-tile-title class="event-title">
        {{ event.title }}
        <span v-if="event.language" class="font-weight-light">
          ({{ event.language }})
        </span>
      </v-list-tile-title>
    </v-list-tile-content>
    <v-list-tile-action @click.prevent="">
      <favourite :event="event"></favourite>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import { mapGetters } from 'vuex'

import Favourite from './Favourite'
import RoomState from './RoomState'

export default {
  name: 'Event',

  components: {
    Favourite,
    RoomState
  },

  props: {
    event: {
      type: Object,
      required: true
    },
    showRoom: Boolean,
    showTrack: Boolean,
    showDay: Boolean,
    showType: Boolean,
    showPersons: Boolean
  },

  computed: {
    ...mapGetters([
      'hasRooms'
    ])
  }
}
</script>

<style scoped>
.event .v-list__tile__title {
  white-space: normal;
  height: auto;
  max-height: 48px;
}

.event .v-list__tile__sub-title {
  color: var(--v-secondary-base) !important;
  white-space: nowrap !important;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline;
}
</style>
