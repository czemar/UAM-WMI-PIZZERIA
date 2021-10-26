export enum ESubjectStatus {
  /**
   * Subject is doing nothing, waiting for commands
   */
  IDLE = 'idle',

  /**
   * Subject is pending data
   */
  PENDING = 'pending',

  /**
   * Subject finished pending and now stores data
   */
  FINAL = 'final',

  /**
   * Subject closed working, subscribers no longer receives value
   */
  CLOSED = 'closed',

  /**
   * Subject inspects problems during runtime
   */
  CRASHED = 'crashed',
}
