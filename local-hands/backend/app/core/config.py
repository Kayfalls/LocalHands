from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    project_name: str = "Local Hands 2.0 API"
    app_version: str = "2.0.0"
    environment: str = "development"

    database_url: str = "postgresql+psycopg://postgres:postgres@postgres:5432/local_hands"

    jwt_secret_key: str = "change-me"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 120

    default_employer_email: str = "employer@localhands.com"
    default_employer_password: str = "ChangeMe123!"
    default_worker_email: str = "worker@localhands.com"
    default_worker_password: str = "ChangeMe123!"

    # Huawei Cloud RDS / networking
    huawei_project_id: str = ""
    huawei_region: str = "af-south-1"

    # Huawei OBS
    huawei_obs_endpoint: str = "https://obs.af-south-1.myhuaweicloud.com"
    huawei_obs_access_key: str = ""
    huawei_obs_secret_key: str = ""
    huawei_obs_bucket: str = "local-hands-assets"

    # Huawei IAM / API integration
    huawei_iam_endpoint: str = "https://iam.myhuaweicloud.com/v3/auth/tokens"
    huawei_iam_domain_name: str = ""
    huawei_iam_username: str = ""
    huawei_iam_password: str = ""

    # ModelArts NLP endpoint (placeholder wiring)
    modelarts_skill_endpoint: str = ""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
