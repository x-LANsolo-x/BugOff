"""initial_fresh_schema

Revision ID: e0666cfeb024
Revises: 
Create Date: 2026-02-14 21:55:26.751747

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'e0666cfeb024'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create ENUM type for difficulty levels
    difficultylevel_enum = postgresql.ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT', name='difficultylevel', create_type=False)
    difficultylevel_enum.create(op.get_bind(), checkfirst=True)
    
    # Create users table
    op.create_table('users',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('role', sa.String(length=50), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    
    # Create demo_sessions table
    op.create_table('demo_sessions',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('expires_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    
    # Create recipes table
    op.create_table('recipes',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('difficulty', difficultylevel_enum, nullable=True),
        sa.Column('prep_time_minutes', sa.Integer(), nullable=True),
        sa.Column('cook_time_minutes', sa.Integer(), nullable=True),
        sa.Column('total_time_minutes', sa.Integer(), nullable=True),
        sa.Column('servings', sa.Integer(), nullable=False),
        sa.Column('calories', sa.Integer(), nullable=True),
        sa.Column('protein_grams', sa.Float(), nullable=True),
        sa.Column('carbs_grams', sa.Float(), nullable=True),
        sa.Column('fat_grams', sa.Float(), nullable=True),
        sa.Column('cuisine_type', sa.String(length=100), nullable=True),
        sa.Column('meal_type', sa.String(length=100), nullable=True),
        sa.Column('tags', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('image_url', sa.Text(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('is_featured', sa.Boolean(), nullable=False),
        sa.Column('ai_generated', sa.Boolean(), nullable=False),
        sa.Column('ai_model', sa.String(length=50), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_recipes_id'), 'recipes', ['id'], unique=False)
    op.create_index(op.f('ix_recipes_title'), 'recipes', ['title'], unique=False)
    
    # Create user_profiles table
    op.create_table('user_profiles',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('cooking_habits', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('user_id')
    )
    
    # Create recipe_steps table
    op.create_table('recipe_steps',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('recipe_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('step_number', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=True),
        sa.Column('instruction', sa.Text(), nullable=False),
        sa.Column('expected_state', sa.String(length=255), nullable=True),
        sa.Column('duration_minutes', sa.Integer(), nullable=True),
        sa.Column('timer_required', sa.Boolean(), nullable=False),
        sa.Column('image_url', sa.Text(), nullable=True),
        sa.Column('video_url', sa.Text(), nullable=True),
        sa.Column('ai_tips', sa.Text(), nullable=True),
        sa.Column('common_mistakes', postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_recipe_steps_id'), 'recipe_steps', ['id'], unique=False)
    op.create_index(op.f('ix_recipe_steps_recipe_id'), 'recipe_steps', ['recipe_id'], unique=False)
    
    # Create cooking_sessions table
    op.create_table('cooking_sessions',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('demo_session_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('recipe_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('started_at', sa.DateTime(), nullable=True),
        sa.Column('completed_at', sa.DateTime(), nullable=True),
        sa.Column('status', sa.String(length=50), nullable=True),
        sa.Column('current_step_index', sa.String(length=50), nullable=True),
        sa.Column('next_step_guidance', sa.Text(), nullable=True),
        sa.ForeignKeyConstraint(['demo_session_id'], ['demo_sessions.id'], ),
        sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    
    # Create failure_analyses table
    op.create_table('failure_analyses',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('demo_session_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('media_url', sa.Text(), nullable=False),
        sa.Column('root_cause', sa.Text(), nullable=True),
        sa.Column('explanation', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['demo_session_id'], ['demo_sessions.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    op.drop_table('failure_analyses')
    op.drop_table('cooking_sessions')
    op.drop_index(op.f('ix_recipe_steps_recipe_id'), table_name='recipe_steps')
    op.drop_index(op.f('ix_recipe_steps_id'), table_name='recipe_steps')
    op.drop_table('recipe_steps')
    op.drop_table('user_profiles')
    op.drop_index(op.f('ix_recipes_title'), table_name='recipes')
    op.drop_index(op.f('ix_recipes_id'), table_name='recipes')
    op.drop_table('recipes')
    op.drop_table('demo_sessions')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
    
    # Drop ENUM type
    difficultylevel_enum = postgresql.ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT', name='difficultylevel')
    difficultylevel_enum.drop(op.get_bind(), checkfirst=True)
