export interface ILogoutRepository {
    logout(): Promise<boolean>
}
